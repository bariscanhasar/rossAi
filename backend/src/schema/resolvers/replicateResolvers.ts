import axios from "axios";
import { ReplicateModel } from "../../orm/model/Replicate/ReplicateModel";
import { User } from "../../orm/model/User/User";
import { v4 as uuidv4 } from "uuid";
import { Prompt } from "../../orm/model/Prompt/Prompt";
import { Style } from "../../orm/model/Style/Style";
import { ReplicatePrediction } from "../../orm/model/Replicate/ReplicatePrediction";
import { Set } from "../../orm/model/Set/Set";
const auth_token = process.env.REPLICATE_TOKEN;

export const replicateResolvers = {
  Query: {
    get_user_replicate_model,
    get_all_set,
    get_set,
    get_all_set_admin,
    get_all_replicate_models
  },
  Mutation: {
    create_replicate_model,
    create_prediction,
  },
};

async function create_replicate_model(
  _,
  { instance_data, gender },
  context,
  __
) {
  try {
    const image_zip = instance_data;

    const ckpt_base = process.env.REPLICATE_CKPT_BASE;
    const trainer_version = process.env.REPLICATE_TRAINER_VERSION;
    const webhook = process.env.REPLICATE_WEBHOOK_MODEL;
    const user_id = context.user.id;
    const user = await User.findOne({ where: { id: user_id } });
    const random_number = Math.floor(Math.random() * 100000);
    const response = await axios({
      method: "post",
      url: "https://dreambooth-api-experimental.replicate.com/v1/trainings",
      headers: { Authorization: `Token ${auth_token}` },
      data: {
        input: {
          instance_prompt: "a photo of a cjw person",
          class_prompt: "a photo of a person",
          instance_data: image_zip,
          max_train_steps: 2000,
          ckpt_base: ckpt_base,
        },
        model: `bariscanhasar/${user_id}${random_number}`,
        trainer_version: trainer_version,
        webhook_completed:
          "https://a645-2a02-e0-8b28-2800-d09-db16-efe3-7942.ngrok-free.app/model",
      },
    });

    const new_model = new ReplicateModel();
    new_model.replicate_id = response.data.id;
    new_model.user = user!;
    new_model.instance_data = image_zip;
    new_model.name = `bariscanhasar/${user_id}${random_number}`;
    new_model.status = response.data.status;
    new_model.gender = gender;
    const saved_model = await new_model.save();

    return saved_model;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function get_user_replicate_model(_, __, context) {
  const user_id = context.user.id;
  const model = await ReplicateModel.findOne({
    where: {
      user: {
        id: user_id,
      },
    },
    relations: ["user"],
  });
  return model;
}

async function create_prediction(_, { style_id,model_id }, context, __) {
  const prediction_output_count = 20;
  const user_id = context.user.id;
  const user = await User.findOne({ where: { id: user_id } });
  const style = await Style.findOne({ where: { id: style_id } });
  const model = await ReplicateModel.findOne({
    where: {id:model_id},
  });
  const prompts = await Prompt.find({
    where: { style: { id: style_id }, gender: model?.gender },
  });

  const integer_number = Math.floor(20 / prompts.length);
  const remaining_number =
    prediction_output_count - integer_number * prompts.length;
  try {
    const set = new Set();
    set.user = user!;
    set.model = model!;
    set.status = "processing";
    const saved_set = await set.save();
    if (integer_number !== 1) {
      prompts.map(async (prompt) => {
        const replicate_prediction = new ReplicatePrediction();
        const response = await axios({
          method: "post",
          url: "https://api.replicate.com/v1/predictions",
          headers: { Authorization: `Token ${auth_token}` },
          data: {
            input: {
              prompt: prompt.prompt,
              negative_prompt: prompt.negative_prompt,
              save_infer_steps: prompt.steps,
              save_guidance_scale: prompt.cfg,
              lr_scheduler: prompt.scheduler,
              num_outputs: integer_number,
            },
            version: model?.version,
            webhook_completed:
              "https://a645-2a02-e0-8b28-2800-d09-db16-efe3-7942.ngrok-free.app/prediction",
          },
        });
        replicate_prediction.replicate_id = response.data.id;
        replicate_prediction.status = response.data.status
        replicate_prediction.model = model!;
        replicate_prediction.prompt = prompt;
        replicate_prediction.style = style!;
        replicate_prediction.set = saved_set;
        const saved_replicate_prediction = await replicate_prediction.save();
      });
      for (let i = 0; i < remaining_number; i++) {
        const replicate_prediction = new ReplicatePrediction();
        const response = await axios({
          method: "post",
          url: "https://api.replicate.com/v1/predictions",
          headers: { Authorization: `Token ${auth_token}` },
          data: {
            input: {
              prompt: prompts[i].prompt,
              negative_prompt: prompts[i].negative_prompt,
              save_infer_steps: prompts[i].steps,
              save_guidance_scale: prompts[i].cfg,
              lr_scheduler: prompts[i].scheduler,
            },
            version: model?.version,
            webhook_completed:
              "https://a645-2a02-e0-8b28-2800-d09-db16-efe3-7942.ngrok-free.app/prediction",
          },
        });
        replicate_prediction.replicate_id = response.data.id;
        replicate_prediction.status = response.data.status
        replicate_prediction.model = model!;
        replicate_prediction.prompt = prompts[i];
        replicate_prediction.style = style!;
        replicate_prediction.set = saved_set;
        const saved_replicate_prediction = await replicate_prediction.save();
      }
    }
  } catch (e) {
    console.log(e);
  }

  const last_style = await Style.findOne({
    where: { id: style_id },
    relations: ["prompt"],
  });

  return last_style;
}

async function get_all_set_admin(_,__,context){
  const set = await Set.find({relations:['user','images']})

  return set
}

async function get_all_set(_,__,context){
  const user_id = context.user.id
  const set = await Set.find({ where: { user: { id: user_id } }, relations: ['images','user'] });

  return set
}

async function get_set(_,{set_id},context,__) {
  console.log(set_id)
  const set = await Set.findOne({where:{id:set_id},relations:['images','user',"model"]})
  console.log(set)
  return set
}

async function get_all_replicate_models(_,) {
  const models = await ReplicateModel.find({relations:['user']})
  return models
}