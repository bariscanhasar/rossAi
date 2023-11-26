import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    BaseEntity,
    ManyToOne,
} from "typeorm";
import {ReplicatePrediction} from "./ReplicatePrediction";


@Entity()
export class ReplicatePredictionImage extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ nullable: true })
    replicate_id!: string;


    @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
    created_at?: Date;

    @ManyToOne(() => ReplicatePrediction, (replicate_prediction) => replicate_prediction.images)
    prediction!: ReplicatePrediction;

}
