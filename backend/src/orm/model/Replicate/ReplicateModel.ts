import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Set } from "../Set/Set";
import { StyleDetails } from "../Style/StyleDetails";
import { User } from "../User/User";
import { ReplicatePrediction } from "./ReplicatePrediction";
enum ReplicateStatusEnum {
  starting = "starting",
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

  @Column()
  name?: string;

  @Column()
  replicateId!: string;

  @Column()
  version?: string;

  @Column()
  image?: string;

  @Column()
  instanceData?: string;




  @Column({
    type: "enum",
    enum: ReplicateStatusEnum,
  })
  status?: ReplicateStatusEnum;

  @Column({
    type: "enum",
    enum: Gender,
  })
  gender?: Gender;

  @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  createdAt?: Date;

  @ManyToOne(() => User, (user) => user.replicateModel)
  user!: User;

  @OneToMany(() => ReplicatePrediction, (prediction) => prediction.model)
  prediction?: ReplicatePrediction;


  @OneToMany(() => Set, (set) => set.model)
  set?: Set;
}
