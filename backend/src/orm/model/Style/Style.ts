import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, BaseEntity} from "typeorm";
import {StyleImages} from "./StyleImages";
import {StyleDetails} from "./StyleDetails";
import {Prompt} from "../Prompt/Prompt";

@Entity()
export class Style extends BaseEntity{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({nullable:true,})
    name?: string;

    @Column({nullable:true,})
    banner?: string;

    @Column({nullable:true,})
    description?: string;

    @Column({nullable:true,})
    is_featured?: boolean;

    @Column({nullable:true,})
    is_collection?: boolean;

    @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
    created_at?: Date;

    @OneToMany(() => StyleImages, (styleImages) => styleImages.style)
    style_images?: StyleImages[];

    @OneToMany(() => StyleDetails, (styleDetails) => styleDetails.style)
    style_details?: StyleDetails[];

    @OneToMany(() => Prompt, (prompt) => prompt.style)
    prompt?: Prompt;
}




