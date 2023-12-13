import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { StyleImages } from "./StyleImages";
import { StyleDetails } from "./StyleDetails";
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

  @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  createdAt?: Date;

  @OneToMany(() => StyleImages, (styleImages) => styleImages.style)
  styleImages?: StyleImages[];

  @OneToMany(() => StyleDetails, (styleDetails) => styleDetails.style)
  styleDetails?: StyleDetails[];

  @OneToMany(() => Prompt, (prompt) => prompt.style)
  prompt?: Prompt;

  @OneToMany(() => ReplicatePrediction, (prediction) => prediction.style)
  prediction?: ReplicatePrediction;
}
