import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    BaseEntity,
    ManyToOne,
} from "typeorm";
import {Set} from './Set'
import {Prompt} from "../Prompt/Prompt";


@Entity()
export class SetImage extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;


    @Column({ nullable: true })
    path!: string;

    @Column({ nullable: true })
    replicate_id!: string;


    @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
    created_at?: Date;


    @ManyToOne(() => Set, (set) => set.images)
    set!: Set;


}
