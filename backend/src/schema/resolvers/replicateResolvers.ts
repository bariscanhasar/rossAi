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
import * as process from "process";
import Logger from "../../core/logger";
import { createModel } from "../../helpers/createModel";
import { In } from "typeorm";
import {checkPermission} from "../../helpers/checkPermission";
const auth_token = process.env.REPLICATE_TOKEN;

export const replicateResolvers = {
  Query: {
    getReplicateModel,
    getAllReplicateModelsAdmin,
    getUserAllReplicateModels,
    onGoingProcess,
  },
  Mutation: {
    createReplicateModel,
    createReplicatePrediction,
    retryCreateReplicateModel,
  },
};

async function createReplicateModel(
  _,
  { instance_data, gender, image },
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

    const saved_model = await createModel(
      instance_data,
      gender,
      image,
      user_id
    );

    return saved_model;
  } catch (e) {
    Logger.error(e);
    throw e;
  }
}

async function getReplicateModel(_, __, context) {
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

async function createReplicatePrediction(_, { style_id, model_id }, context, __) {
  const user_id = context.user.id;
  const user = await User.findOne({ where: { id: user_id } });
  const style = await Style.findOne({ where: { id: style_id } });
  const model = await ReplicateModel.findOne({
    where: { user: { id: user_id }, id: model_id },
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
    set.name = `${user?.first_name}/SET `;
    set.user = user!;
    set.model = model!;
    set.status = "processing";
    const saved_set = await set.save();
    const rest = await createPrediction(prompts, 10, model!, style!, saved_set);

    credit!.amount = -1;
    await credit!.save();
    Logger.info(`Created predictions for user: ${user_id}`);
    return saved_set;
  } catch (e) {
    Logger.error(e);
    console.log(e);
  }
}

async function getUserAllReplicateModels(_, __, context) {
  const user_id = context.user.id;
  const models = await ReplicateModel.find({
    where: { user: { id: user_id } },
  });

  return models;
}

async function getAllReplicateModelsAdmin(_,__,context) {
  checkPermission(context.user.role)
  const models = await ReplicateModel.find({ relations: ["user"] });
  return models;
}

async function onGoingProcess(_, __) {
  const set = await Set.find({
    where: { status: In(["processing", "waiting", "started"]) },
  });
  const model = await ReplicateModel.find({
    where: { status: In(["processing", "waiting", "started"]) },
  });

  return [set, model];
}

async function retryCreateReplicateModel(_, { model_id }) {
  const model = await ReplicateModel.findOne({
    where: { id: model_id },
    relations: ["user"],
  });

  if (model?.status === "failed") {
    const retry_model = await createModel(
      model.instance_data!,
      model.gender!,
      model.image!,
      model.user.id!
    );
    return retry_model;
  }
  return Error("Model status is not failed.");
}


