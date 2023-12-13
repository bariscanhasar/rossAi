import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, BaseEntity, ManyToOne} from "typeorm";
import {Style} from "../Style/Style";
import {ReplicatePrediction} from "../Replicate/ReplicatePrediction";

enum Scheduler {
    DDIM = "DDIM",
    DPMSOLVERMULTISTEP = "DPMSOLVERMULTISTEP",
    K_EULER = "K_EULER",
    K_EULER_ANCESTRAL = "K_EULER_ANCESTRAL",
    KLMS = "KLMS",
    PNDM = "PNDM"
}

enum Gender {
    FEMALE = "FEMALE",
    MALE = "MALE",
}


@Entity()
export class Prompt extends BaseEntity{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    promptText?: string;

    @Column()
    negativePrompt?: string;

    @Column()
    steps?: number;

    @Column()
    cfg?: number;

    @Column({nullable:true,})
    seeds?: number;

    @Column({
        type: "enum",
        enum: Scheduler,
    })
    scheduler?: Scheduler;


    @Column({
        type: "enum",
        enum: Gender,
    })
    gender?: Gender;

    @ManyToOne(() => Style, (style) => style.prompt)
    style!: Style

    @OneToMany(() => ReplicatePrediction, (prediction) => prediction.prompt)
    prediction?: ReplicatePrediction;

    @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
    createdAt?: Date;




}




