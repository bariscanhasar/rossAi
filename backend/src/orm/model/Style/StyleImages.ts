import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BaseEntity,ManyToOne} from "typeorm";
import {Style} from "./Style"
@Entity()
export class StyleImages extends BaseEntity{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    path?: string;

    @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
    created_at?: Date;

    @ManyToOne(() => Style, (style) => style.styleImages)
    style!: Style

}




