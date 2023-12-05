import axios from "axios";
import { ReplicateModel } from "../../orm/model/Replicate/ReplicateModel";
import { User } from "../../orm/model/User/User";
import { Prompt } from "../../orm/model/Prompt/Prompt";
import { Style } from "../../orm/model/Style/Style";
import { Set } from "../../orm/model/Set/Set";
import { createPrediction } from "../../helpers/createPrediction";
import { Credit, CreditTypeEnum } from "../../orm/model/Credit/Credit";
import moment from "moment";
import { Between } from "typeorm";

const auth_token = process.env.REPLICATE_TOKEN;

export const replicateResolvers = {
  Query: {
    get_user_replicate_model,
    get_all_user_set,
    get_set,
    get_all_set_admin,
    get_all_replicate_models,
    get_all_user_replicate_models,
    deneme,
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

    const currentDate = moment().utc().startOf("day");


    const startOfDay = currentDate.toDate();
    const endOfDay = moment(currentDate).endOf("day").toDate();

    const credit = await Credit.findOne({
      where: {
        user: { id: user_id },
        date: Between(startOfDay, endOfDay),
        type: CreditTypeEnum.TRAIN,
      },
    });

    if (!credit) return Error("no credit for train");

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
          "https://55e3-2a02-e0-8b28-2800-d09-db16-efe3-7942.ngrok-free.app/modelwebhook",
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

    credit!.amount = -1
    await credit.save()

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

async function create_prediction(_, { style_id, model_id }, context, __) {
  const user_id = context.user.id;
  const user = await User.findOne({ where: { id: user_id } });
  const style = await Style.findOne({ where: { id: style_id } });
  const model = await ReplicateModel.findOne({
    where: { user: { id: user_id } },
  });
  const prompts = await Prompt.find({
    where: { style: { id: style_id }, gender: model?.gender },
  });

  const currentDate = moment().utc().startOf("day");


  const startOfDay = currentDate.toDate();
  const endOfDay = moment(currentDate).endOf("day").toDate();

  const credit = await Credit.findOne({
    where: {
      user: { id: user_id },
      date: Between(startOfDay, endOfDay),
      type: CreditTypeEnum.PREDICT,
    },
  });




  if (credit?.amount! < 0) return Error("no credit for predict");

  try {
    const set = new Set();
    set.user = user!;
    set.model = model!;
    set.status = "processing";
    const saved_set = await set.save();
    const rest = await createPrediction(prompts, 10, model!, style!, saved_set);

    credit!.amount = -1;
    await credit!.save();
  } catch (e) {
    console.log(e);
  }

  const last_style = await Style.findOne({
    where: { id: style_id },
    relations: ["prompt"],
  });

  return last_style;
}

async function get_all_set_admin(_, __, context) {
  const set = await Set.find({ relations: ["user", "images"] });

  return set;
}

async function get_all_user_set(_, __, context) {
  const user_id = context.user.id;
  const set = await Set.find({
    where: { user: { id: user_id } },
    relations: ["images", "user"],
  });

  return set;
}

async function get_set(_, { set_id }, context, __) {
  const set = await Set.findOne({
    where: { id: set_id },
    relations: ["images", "user", "model"],
  });
  return set;
}

async function get_all_user_replicate_models(_, __, context) {
  const user_id = context.user.id;
  const models = await ReplicateModel.find({
    where: { user: { id: user_id } },
  });

  return models;
}

async function get_all_replicate_models(_) {
  const models = await ReplicateModel.find({ relations: ["user"] });
  return models;
}

async function deneme(_, __, context) {
  const user_id = context.user.id;
  const currentDate = moment().utc().startOf("day");


  const startOfDay = currentDate.toDate();
  const endOfDay = moment(currentDate).endOf("day").toDate();

  const credits = await Credit.find({
    where: {
      user: { id: user_id },
      date: Between(startOfDay, endOfDay),
      type: CreditTypeEnum.TRAIN,
    },
  });

  return credits;
}
