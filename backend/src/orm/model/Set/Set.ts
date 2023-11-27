import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, BaseEntity, ManyToOne} from "typeorm";
import {Style} from "../Style/Style";
import {ReplicatePrediction} from "../Replicate/ReplicatePrediction";
import {User} from "../User/User";
import {ReplicateModel} from "../Replicate/ReplicateModel";
import {SetImage} from "./SetImage";

enum ReplicateStatusEnum {
    starting = "starting",
    canceled = "canceled",
    failed = "failed",
    processing = "processing",
    succeeded = "succeeded",
    waiting = "waiting",
}

@Entity()
export class Set extends BaseEntity{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({nullable:true,})
    name?: string;

    @Column({
        nullable: true,
        type: "enum",
        enum: ReplicateStatusEnum, // Use the enum you've defined
    })
    status?: string;

    @ManyToOne(() => User, (user) => user.set)
    user!: User;

    @ManyToOne(() => ReplicateModel, (replicate_model) => replicate_model.set)
    model!: ReplicateModel;

    @OneToMany(() => ReplicatePrediction, (replicate_prediction) => replicate_prediction.set)
    prediction!: ReplicatePrediction;

    @OneToMany(() => SetImage, (set_image) => set_image.set)
    images!: SetImage[]


    @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
    created_at?: Date;




}




