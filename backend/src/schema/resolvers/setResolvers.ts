import { Set } from "../../orm/model/Set/Set";
import {checkPermission} from "../../helpers/checkPermission";

export const setResolvers = {
  Query: {
    getAllSetsAdmin,
    getAllSets,
    getSet,
  },
  Mutation: {},
};

async function getAllSetsAdmin(_, __, context) {

  checkPermission(context.user.role)
  const set = await Set.find({
    relations: ["user", "images", "model"],
    order: { created_at: "DESC" },
  });

  return set;
}

async function getAllSets(_, { status, modelId }, context) {
  const user_id = context.user.id;
  if (status) {
    const set = await Set.find({
      where: { user: { id: user_id }, status: status, model: { id: modelId } },
      relations: ["images", "user"],
    });
    return set;
  }

  const set = await Set.find({
    where: { user: { id: user_id }, model: { id: modelId } },
    relations: ["images", "user"],
  });

  return set;
}

async function getSet(_, { setId }, context, __) {
  const set = await Set.findOne({
    where: { id: setId },
    relations: ["images", "user", "model"],
  });
  return set;
}
