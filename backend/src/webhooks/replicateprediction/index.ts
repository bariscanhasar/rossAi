import express from "express";
import { Set } from "../../orm/model/Set/Set";
import { ReplicatePrediction } from "../../orm/model/Replicate/ReplicatePrediction";
import axios from "axios";
import path from "path";
import { SetImage } from "../../orm/model/Set/SetImage";
import { v4 as uuidv4 } from "uuid";
import S3Repo from "../../core/aws"
import {sendPushNotification} from "../../core/firebase";
import {User} from "../../orm/model/User/User";
const router = express.Router();

const output_directory = path.join(__dirname, "../../../prediction_images");

router.post("/", async (req, res) => {
  const output = req.body.output;
  const replicateId = req.body.id;
  const exist_prediction = await ReplicatePrediction.findOne({
    where: { replicateId: replicateId },
    relations: ["set"],
  });
  const set_id = exist_prediction?.set.id;
  const exist_set = await Set.findOne({ where: { id: set_id },relations:["images","user"] });
  const user = await User.findOne({where:{id:exist_set?.user.id}})
  if (!exist_set) res.status(500).json("Error on prediction webhook.")

  // @ts-ignore
  const imageNames: [string] = [];
  output.map(async (url) => {
    const imageUrl = url;
    const imageName = uuidv4();

    try {
      const response = await axios.get(imageUrl, {
        responseType: "arraybuffer",
      });
      await S3Repo.uploadImage(imageName,response.data)

      const set_image = new SetImage();
      set_image.set = exist_set!;
      set_image.replicateId = replicateId;
      //@ts-ignore
      set_image.path = imageName;
      await set_image.save();
    } catch (error) {
      console.error(error);
    }
  });
  exist_set!.status = "succeeded"
  await exist_set?.save()

  if (user?.fcmId && exist_set &&  (exist_set.images!.length >= 20 || exist_set.images.length >= 50)) {
   await sendPushNotification(user?.fcmId,"Your outputs waiting you.","Now u can enjoy our app.")
  }
  res.status(200).send(req.body);
});


export default router;
