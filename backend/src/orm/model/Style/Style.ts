import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Prompt } from "../Prompt/Prompt";
import { ReplicatePrediction } from "../Replicate/ReplicatePrediction";

@Entity()
export class Style extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column()
  banner?: string;

  @Column()
  description?: string;

  @Column()
  isFeatured?: boolean;

  @Column()
  isCollection?: boolean;

  @Column("simple-array",{nullable:true})
  images?: string[];

  @Column("simple-array",{nullable:true})
  details?: string[];

  @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  createdAt?: Date;

  @OneToMany(() => Prompt, (prompt) => prompt.style)
  prompt?: Prompt;

  @OneToMany(() => ReplicatePrediction, (prediction) => prediction.style)
  prediction?: ReplicatePrediction;
}
