import express from "express";
import { ReplicateModel } from "../../orm/model/Replicate/ReplicateModel";
import { Style } from "../../orm/model/Style/Style";
import { Prompt } from "../../orm/model/Prompt/Prompt";
import { User } from "../../orm/model/User/User";
import { Set } from "../../orm/model/Set/Set";
import { createPrediction } from "../../helpers/createPrediction";

const router = express.Router();

router.post("/", async (req, res) => {
  const replicate_id = req.body.id;
  const model = await ReplicateModel.findOne({
    where: { replicate_id: replicate_id },
    relations: ["user"],
  });
  const style = await Style.findOne({ where: { id: 34 } });
  const prompts = await Prompt.find({ where: { gender: model?.gender } });
  const user = await User.findOne({ where: { id: model!.user.id } });
  model!.version = req.body.version!;
  model!.status = req.body.status!;
  const modified_model = await model!.save();
  const set = new Set();
  set.user = user!;
  set.model = model!;
  set.status = "processing";
  const saved_set = await set.save();
  const results = await createPrediction(prompts, 50, model!, style!, set);

  console.log(req.body);
  res.status(200).send(modified_model);
});

export default router;