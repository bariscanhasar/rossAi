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
import { ReplicatePrediction } from "./ReplicatePrediction";
enum ReplicateStatusEnum {
  startind = "starting",
  canceled = "canceled",
  failed = "failed",
  processing = "processing",
  succeeded = "succeeded",
  waiting = "waiting",
}

enum Gender {
  FEMALE = "FEMALE",
  MALE = "MALE",
}

@Entity()
export class ReplicateModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  replicate_id!: string;

  @Column({ nullable: true })
  version?: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: true })
  instance_data?: string;

  @Column({
    nullable: true,
    type: "enum",
    enum: ReplicateStatusEnum, // Use the enum you've defined
  })
  status?: ReplicateStatusEnum;

  @Column({
    nullable: true,
    type: "enum",
    enum: Gender, // Use the enum you've defined
  })
  gender?: Gender;

  @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  created_at?: Date;

  @ManyToOne(() => User, (user) => user.replicate_model)
  user!: User;

  @OneToMany(() => ReplicatePrediction, (prediction) => prediction.model)
  prediction?: ReplicatePrediction;
}
