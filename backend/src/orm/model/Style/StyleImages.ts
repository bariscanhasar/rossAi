import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BaseEntity,ManyToOne} from "typeorm";
import {Style} from "./Style"
@Entity()
export class StyleImages extends BaseEntity{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({nullable:true,})
    path?: string;

    @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
    created_at?: Date;

    @ManyToOne(() => Style, (style) => style.style_images)
    style!: Style

}




