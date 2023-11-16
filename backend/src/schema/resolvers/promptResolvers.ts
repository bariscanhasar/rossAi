import {Prompt} from "../../orm/model/Prompt/Prompt";
import {Style} from "../../orm/model/Style/Style";

export const promptResolvers = {
    Query: {
        get_all_prompts,
        get_prompt
    },
    Mutation: {
        create_prompt
    },
};


async function create_prompt(_,{
    prompt,
    negative_prompt,
    steps,
    cfg,
    seeds,
    scheduler,
    gender,
    style_id
}){
    const style = await Style.findOne({where:{id:style_id}})


    console.log(style_id)
   const newPrompt = new Prompt()
    newPrompt.prompt = prompt
    newPrompt.negative_prompt = negative_prompt
    newPrompt.steps = steps
    newPrompt.cfg = cfg
    newPrompt.seeds = seeds
    newPrompt.scheduler = scheduler
    newPrompt.gender = gender
    newPrompt.style = style!

    await newPrompt.save()


    return newPrompt


}
async function get_all_prompts(_,{
}){

    const style = await Style.find({relations:["prompt"]})
    return style

}

async function get_prompt(_,{
    prompt_id
}) {
    const prompt = await Prompt.findOne({where:{id:prompt_id}})
    return prompt
}
