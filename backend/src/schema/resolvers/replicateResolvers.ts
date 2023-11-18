import axios from "axios";
import { ReplicateModel } from "../../orm/model/Replicate/ReplicateModel";
import { User } from "../../orm/model/User/User";
import { v4 as uuidv4 } from "uuid";
import { Prompt } from "../../orm/model/Prompt/Prompt";
import { Style } from "../../orm/model/Style/Style";

export const replicateResolvers = {
  Query: {
    get_replicate_model,
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
  console.log("Context:", context);
  console.log("Instance Data:", instance_data);
  try {
    const image_zip = instance_data;
    console.log(image_zip);
    const auth_token = process.env.REPLICATE_TOKEN;
    const ckpt_base = process.env.REPLICATE_CKPT_BASE;
    const trainer_version = process.env.REPLICATE_TRAINER_VERSION;
    const webhook = process.env.REPLICATE_WEBHOOK;
    const user_id = context.user.id;
    const user = await User.findOne({ where: { id: user_id } });
    const uuid = uuidv4();
    const model_name = `bariscanhasar/${uuid}`;
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
        model: `bariscanhasar/${user_id}`,
        trainer_version: trainer_version,
        webhook_completed:
          "https://6875-2a02-e0-8b28-2800-d09-db16-efe3-7942.ngrok-free.app/replicate",
      },
    });

    const new_model = new ReplicateModel();
    new_model.replicate_id = response.data.id;
    new_model.user = user!;
    new_model.instance_data = image_zip;
    new_model.name = `bariscanhasar/${user_id}`;
    new_model.status = response.data.status;
    const saved_model = await new_model.save();

    console.log(response.data);

    return saved_model;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function get_replicate_model(_, __, context) {
  const user_id = context.user.id;
  console.log(user_id);
  const model = await ReplicateModel.findOne({
    where: {
      user: {
        id: user_id,
      },
    },
    relations: ["user"],
  });
  console.log(model);
  return model;
}

async function create_prediction(_, { style_id }, context, __) {
  const prediction_output_count = 20
  const user_id = context.user.id;
  const user = await User.findOne({ where: { id: user_id } });
  const model = await ReplicateModel.findOne({where:{user:{id:user_id}}});

  const prompts = await Prompt.find({where:{style:{id:style_id},gender:model?.gender}})

  const style = await Style.findOne({
    where: { id: style_id },
    relations: ["prompt"],
  });

  console.log(prompts.length);

  return style;
}
