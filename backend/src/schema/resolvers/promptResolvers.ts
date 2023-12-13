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
    deletePrompt,
    updatePrompt
  },
};

async function createPrompt(
  _,
  { promptText, negativePrompt, steps, cfg, seeds, scheduler, gender, styleId },
  context
) {
  checkPermission(context.user.role)
  const style = await Style.findOne({ where: { id: styleId } });

  const newPrompt = new Prompt();
  newPrompt.promptText = promptText;
  newPrompt.negativePrompt = negativePrompt;
  newPrompt.steps = steps;
  newPrompt.cfg = cfg;
  newPrompt.scheduler = scheduler;
  newPrompt.gender = gender;
  newPrompt.style = style!;

  await newPrompt.save();

  return newPrompt;
}

async function updatePrompt(_,{ promptId,promptText, negativePrompt, steps, cfg, seeds, scheduler, gender, styleId },context) {
  checkPermission(context.user.role)
  const prompt = await Prompt.findOne({where:{id:promptId}})
  const style = await Style.findOne({ where: { id: styleId } });
  prompt!.promptText = promptText;
  prompt!.negativePrompt = negativePrompt;
  prompt!.steps = steps;
  prompt!.cfg = cfg;
  prompt!.scheduler = scheduler;
  prompt!.gender = gender;
  prompt!.style = style!;

 const savedPrompt = await prompt?.save()

  return savedPrompt






}


async function getAllPrompts(_, __, context, {}) {
  checkPermission(context.user.role)
  const style = await Style.find({ relations: ["prompt"] });
  console.log(style.map(style => style.prompt))
  return style;
}

async function getPrompt(_, { promptId },context) {
  checkPermission(context.user.role)
  const prompt = await Prompt.findOne({ where: { id: promptId } });
  return prompt;
}

async function deletePrompt(_,{promptId},context) {
  const prompt = await Prompt.findOne({where:{id:promptId}})
  await prompt?.remove()

  return prompt






}
