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
import { checkPermission } from "../../helpers/checkPermission";


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
  { instanceData, gender, image },
  context,
  __
) {
  try {
    const userId = context.user.id;

    const currentDate = moment().utc().startOf("day");

    const startOfDay = currentDate.toDate();
    const endOfDay = moment(currentDate).endOf("day").toDate();

    const credit = await Credit.findOne({
      where: {
        user: { id: userId },
        date: Between(startOfDay, endOfDay),
        type: CreditTypeEnum.TRAIN,
      },
      order: { createdAt: "DESC" },

    });

    if(!credit) return Error('no credit for prediction.')

    if (credit?.amount! < 0) return Error("u already used ur credit.t");

    const saved_model = await createModel(instanceData, gender, image, userId);

    return saved_model;
  } catch (e) {
    Logger.error(e);

    throw e
  }
}

async function getReplicateModel(_, __, context) {
  const user_id = context.user.id;
  const model = await ReplicateModel.find({
    where: {
      user: {
        id: user_id,
      },
    },
    relations: ["user"],
  });

  return model;
}

async function createReplicatePrediction(_, { styleId, modelId }, context, __) {
  const user_id = context.user.id;
  const user = await User.findOne({ where: { id: user_id } });
  const style = await Style.findOne({ where: { id: styleId } });
  const model = await ReplicateModel.findOne({
    where: { user: { id: user_id }, id: modelId },
  });
  const prompts = await Prompt.find({
    where: { style: { id: styleId }, gender: model?.gender },
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
    order: { createdAt: "DESC" },

  });
  if(!credit) return Error('no credit for prediction.')

  if (credit?.amount! < 0) return Error("u already used ur credit.t");


  try {
    const set = new Set();
    set.name = `${user?.firstName}/SET `;
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

async function getAllReplicateModelsAdmin(_, __, context) {
  checkPermission(context.user.role);
  const models = await ReplicateModel.find({ relations: ["user"] });
  return models;
}
async function onGoingProcess(_, __,context) {
  const userId = context.user.id
  try {
    const sets = await Set.find({
      where: {
        status: In(["processing", "waiting", "starting"]),
        user:{id:userId}

      },
      relations: ["model"],
    });

    const models = await ReplicateModel.find({
      where: {
        status: In(["processing", "waiting", "starting"]),
        user:{id:userId}
      },
    });

    return { models, sets };
  } catch (e) {
    console.log(e);
  }
}

async function retryCreateReplicateModel(_, { model_id }) {
  const model = await ReplicateModel.findOne({
    where: { id: model_id },
    relations: ["user"],
  });

  if (model?.status === "failed") {
    const retry_model = await createModel(
      model.instanceData!,
      model.gender!,
      model.image!,
      model.user.id!
    );
    return retry_model;
  }
  return Error("Model status is not failed.");
}
