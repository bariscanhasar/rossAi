import express from "express";
import { Set } from "../../orm/model/Set/Set";
import { ReplicatePrediction } from "../../orm/model/Replicate/ReplicatePrediction";
import axios from "axios";
import path from "path";
import fs from "fs";
import { SetImage } from "../../orm/model/Set/SetImage";
import { v4 as uuidv4 } from "uuid";
const router = express.Router();

const output_directory = path.join(__dirname, "../../../prediction_images");

router.post("/", async (req, res) => {
  const output = req.body.output;
  const replicate_id = req.body.id;
  const exist_prediction = await ReplicatePrediction.findOne({
    where: { replicate_id: replicate_id },
    relations: ["set"],
  });
  const set_id = exist_prediction?.set.id;
  const exist_set = await Set.findOne({ where: { id: set_id } });

  if (!exist_set) res.status(500).json("Error on prediction webhook.")

  // @ts-ignore
  const imageNames: [string] = [];
  output.map(async (url) => {
    const imageUrl = url;
    const imageName = uuidv4() + ".jpg";

    try {
      const response = await axios.get(imageUrl, {
        responseType: "arraybuffer",
      });
      const imagePath = path.join(output_directory, imageName);
      fs.writeFileSync(imagePath, Buffer.from(response.data));
      imageNames.push(imageName);
      const set_image = new SetImage();
      set_image.set = exist_set!;
      set_image.replicate_id = replicate_id;
      set_image.path = imageName;
      await set_image.save();
    } catch (error) {
      console.error(error);
    }
  });
  exist_set!.status = "succeded"
  await exist_set?.save()
  res.status(200).send(req.body);
});


export default router;
