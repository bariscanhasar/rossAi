import { Prompt } from "../../orm/model/Prompt/Prompt";
import { Style } from "../../orm/model/Style/Style";
import {checkPermission} from "../../helpers/checkPermission";

export const promptResolvers = {
  Query: {
    getAllPrompts,
    getPrompt,
  },
  Mutation: {
    createPrompt,
    deletePrompt
  },
};

async function createPrompt(
  _,
  { prompt, negative_prompt, steps, cfg, seeds, scheduler, gender, style_id },
  context
) {
  checkPermission(context.user.role)
  const style = await Style.findOne({ where: { id: style_id } });

  const newPrompt = new Prompt();
  newPrompt.prompt = prompt;
  newPrompt.negative_prompt = negative_prompt;
  newPrompt.steps = steps;
  newPrompt.cfg = cfg;
  newPrompt.scheduler = scheduler;
  newPrompt.gender = gender;
  newPrompt.style = style!;

  await newPrompt.save();

  return newPrompt;
}
async function getAllPrompts(_, __, context, {}) {
  checkPermission(context.user.role)
  const style = await Style.find({ relations: ["prompt"] });
  return style;
}

async function getPrompt(_, { prompt_id },context) {
  checkPermission(context.user.role)
  const prompt = await Prompt.findOne({ where: { id: prompt_id } });
  return prompt;
}

async function deletePrompt(_,{promptId},context) {
  const prompt = await Prompt.findOne({where:{id:promptId}})
  await prompt?.remove()

  return prompt






}
