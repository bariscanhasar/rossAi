import { Prompt } from "../orm/model/Prompt/Prompt";
import { ReplicatePrediction } from "../orm/model/Replicate/ReplicatePrediction";
import axios from "axios";
import { ReplicateModel } from "../orm/model/Replicate/ReplicateModel";
import { Style } from "../orm/model/Style/Style";
import { Set } from "../orm/model/Set/Set";
const auth_token = process.env.REPLICATE_TOKEN;

async function createPrediction(
  prompts: Prompt[],
  numberOfOutputs: number,
  model: ReplicateModel,
  style: Style,
  set: Set
) {
  type MyDictionary = {
    prompt: Prompt;
    outputs: number;
  };
  const maxOutputsPerRequest = 4;
  let remainingOutputs = numberOfOutputs;
  let requestDistribution: Array<MyDictionary> = [];

  for (const prompt of prompts) {
    if (remainingOutputs <= 0) break;

    const outputsForThisPrompt = Math.min(remainingOutputs, 1);

    requestDistribution.push({ prompt, outputs: outputsForThisPrompt });
    remainingOutputs -= outputsForThisPrompt;
  }

  let index = 0;
  while (remainingOutputs > 0) {
    const item = requestDistribution[index];

    const additionalOutput = Math.min(
      remainingOutputs,

      maxOutputsPerRequest - (item.outputs % 4)
    );

    item.outputs += additionalOutput;
    remainingOutputs -= additionalOutput;
    index = (index + 1) % prompts.length;
  }

  for (const item of requestDistribution) {
    const prompt = item.prompt;
    const outputs = item.outputs;

    for (let i = 0; i < outputs; i += maxOutputsPerRequest) {
      const numOutput = Math.min(maxOutputsPerRequest, outputs - i);
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

            num_outputs: numOutput,
          },
          version: model?.version,
          webhook_completed:
            "https://e830-2a02-e0-8bdf-8a00-c0ba-b114-231e-1650.ngrok-free.app/predictionwebhook",
        },
      });
      replicate_prediction.set = set;
      replicate_prediction.model = model;
      replicate_prediction.replicate_id = response.data.id;
      replicate_prediction.style = style;
      replicate_prediction.prompt = prompt[i];
      await replicate_prediction.save();
    }
  }
}

export { createPrediction };
