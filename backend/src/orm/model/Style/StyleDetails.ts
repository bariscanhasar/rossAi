import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, BaseEntity,ManyToOne} from "typeorm";
import {Style} from "./Style"
@Entity()
export class StyleDetails extends BaseEntity{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({nullable:true,})
    name?: string;

    @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
    createdAt?: Date;

    @ManyToOne(() => Style, (style) => style.styleDetails)
    style!: Style



}




