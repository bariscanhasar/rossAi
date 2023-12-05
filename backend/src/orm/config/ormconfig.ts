import { ConnectionOptions } from "typeorm";
import * as config from "../../config"
import {User} from '../model/User/User'
import {Style} from "../model/Style/Style";
import {StyleImages} from "../model/Style/StyleImages";
import {StyleDetails} from "../model/Style/StyleDetails";
import {Prompt} from "../model/Prompt/Prompt"
import {ReplicateModel} from "../model/Replicate/ReplicateModel";
import {ReplicatePrediction} from "../model/Replicate/ReplicatePrediction";
import {Set} from '../model/Set/Set'
import {SetImage} from "../model/Set/SetImage";
import {Credit} from "../model/Credit/Credit";

const ormConfig: ConnectionOptions = {
  type: "postgres",
  name: "typeorm",
  host: config.db.host,
  port: config.db.port,
  username: config.db.user,
  password: config.db.password,
  database: config.db.database,
  synchronize: true,
  logging: false,
  entities: [
    User,
    Style,
    StyleImages,
    StyleDetails,
    Prompt,
    ReplicateModel,
    ReplicatePrediction,
    Set,
    SetImage,
    Credit
  ],
};

export = ormConfig;
