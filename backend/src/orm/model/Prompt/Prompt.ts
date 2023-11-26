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

    @Column({nullable:true,})
    prompt?: string;

    @Column({nullable:true,})
    negative_prompt?: string;

    @Column({nullable:true,})
    steps?: number;

    @Column({nullable:true,})
    cfg?: number;

    @Column({nullable:true,})
    seeds?: number;

    @Column({
        type: "enum",
        enum: Scheduler, // Use the enum you've defined
    })
    scheduler?: Scheduler;


    @Column({
        type: "enum",
        enum: Gender, // Use the enum you've defined
    })
    gender?: Gender;

    @ManyToOne(() => Style, (style) => style.style_details)
    style!: Style

    @OneToMany(() => ReplicatePrediction, (prediction) => prediction.prompt)
    prediction?: ReplicatePrediction;

    @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
    created_at?: Date;




}




