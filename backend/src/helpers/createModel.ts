import { Prompt } from "../orm/model/Prompt/Prompt";
import { ReplicatePrediction } from "../orm/model/Replicate/ReplicatePrediction";
import axios from "axios";
import { ReplicateModel } from "../orm/model/Replicate/ReplicateModel";
import { Style } from "../orm/model/Style/Style";
import { Set } from "../orm/model/Set/Set";
import process from "process";
import {User} from "../orm/model/User/User";
import moment from "moment/moment";
import {Credit, CreditTypeEnum} from "../orm/model/Credit/Credit";
import {Between} from "typeorm";
import Logger from "../core/logger";
const auth_token = process.env.REPLICATE_TOKEN;
enum Gender {
    FEMALE = "FEMALE",
    MALE = "MALE",
}
enum ReplicateStatusEnum {
    starting = "starting",
    canceled = "canceled",
    failed = "failed",
    processing = "processing",
    succeeded = "succeeded",
    waiting = "waiting",
}

async function createModel(
    instance_data: string,
    gender: Gender,
    image: string,
    userId: number,
) {

    const image_zip = instance_data;
    const ckpt_base = process.env.REPLICATE_CKPT_BASE;
    const trainer_version = process.env.REPLICATE_TRAINER_VERSION;
    const webhook = process.env.REPLICATE_WEBHOOK_MODEL;
    const user = await User.findOne({ where: { id: userId } });
    const random_number = Math.floor(Math.random() * 100000);




    const response = await axios({
        method: "post",
        url: 'https://dreambooth-api-experimental.replicate.com/v1/trainings',
        headers: { Authorization: `Token ${auth_token}` },
        data: {
            input: {
                instance_prompt: "a photo of a cjw person",
                class_prompt: "a photo of a person",
                instance_data: image_zip,
                max_train_steps: 2000,
                ckpt_base: ckpt_base,
            },
            model: `kajmergroup/${userId}${random_number}`,
            trainer_version: trainer_version,
            webhook_completed:
            process.env.REPLICATE_WEBHOOK_MODEL,
        },
    });
    
    const new_model = new ReplicateModel();
    new_model.replicateId = response.data.id;
    new_model.user = user!;
    new_model.instanceData = image_zip;
    new_model.name = `bariscanhasar/${userId}${random_number}`;
    new_model.status = response.data.status;
    new_model.gender = gender;
    new_model.image = image
    const saved_model = await new_model.save();



    return saved_model;

}

export { createModel };
