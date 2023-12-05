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

  @Column({ nullable: true })
  replicate_id!: string;

  @Column({ nullable: true })
  prompt_text?: string;

  @Column({ nullable: true })
  negative_prompt?: string;

  @Column({ nullable: true })
  prompt_steps?: string;

  @Column({ nullable: true })
  prompt_cfg?: string;

  @Column({ nullable: true })
  prompt_output?: string;

  @Column({
    nullable: true,
    type: "enum",
    enum: Scheduler, // Use the enum you've defined
  })
  prompt_scheduler?: Scheduler;


  @Column({
    nullable: true,
    type: "enum",
    enum: ReplicateStatusEnum, // Use the enum you've defined
  })
  status?: string;


  @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  created_at?: Date;

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
