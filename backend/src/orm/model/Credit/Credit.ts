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
import { User } from "../User/User";
export enum CreditTypeEnum {
  TRAIN = "TRAIN",
  PREDICT = "PREDICT",
}

@Entity()
export class Credit extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  amount?: number;

  @Column({ nullable: true })
  date?: Date;

  @Column({ nullable: true })
  rcEventId?: string;

  @Column({
    type: "enum",
    enum: CreditTypeEnum,
    nullable: true,
  })
  type?: CreditTypeEnum;
  @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  createdAt?: Date;

  @ManyToOne(() => User, (user) => user.credit)
  user!: User;
}
