import {Prompt} from "../../orm/model/Prompt/Prompt";
import {Style} from "../../orm/model/Style/Style";

export const promptResolvers = {
    Query: {
        get_all_prompts
    },
    Mutation: {
        create_prompt
    },
};


async function create_prompt(_,{
    prompt_text,
    negative_prompt,
    steps,
    cfg,
    seeds,
    scheduler,
    gender,
    style_id
}){
    const style = await Style.findOne({where:{id:style_id}})

    console.log(style)

   const prompt = new Prompt()
    prompt.prompt = prompt_text
    prompt.negative_prompt = negative_prompt
    prompt.steps = steps
    prompt.cfg = cfg
    prompt.seeds = seeds
    prompt.scheduler = scheduler
    prompt.gender = gender
    prompt.style = style!

    await prompt.save()


    return prompt


}
async function get_all_prompts(_,{
}){
    const prompts = await Prompt.find()
    console.log(prompts)
    return prompts


}
