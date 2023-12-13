import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Style } from "../Style/Style";
import { StyleDetails } from "../Style/StyleDetails";
import { User } from "../User/User";
import { Prompt } from "../Prompt/Prompt";
import { ReplicateModel } from "./ReplicateModel";
import {Set} from "../Set/Set";
enum Scheduler {
  DDIM = "DDIM",
  DPMSOLVERMULTISTEP = "DPMSOLVERMULTISTEP",
  K_EULER = "K_EULER",
  K_EULER_ANCESTRAL = "K_EULER_ANCESTRAL",
  KLMS = "KLMS",
}

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
@Entity()
export class ReplicatePrediction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  replicateId!: string;

  @Column({
    nullable: true,
    type: "enum",
    enum: ReplicateStatusEnum,
  })
  status?: string;


  @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  createdAt?: Date;

  @ManyToOne(() => Style, (style) => style.prediction)
  style!: Style | null;

  @ManyToOne(() => Prompt, (prompt) => prompt.prediction)
  prompt!: Prompt;

  @ManyToOne(
    () => ReplicateModel,
    (replicate_model) => replicate_model.prediction
  )
  model!: ReplicateModel;

  @ManyToOne(() => Set, (set) => set.prediction)
  set!: Set;


}
