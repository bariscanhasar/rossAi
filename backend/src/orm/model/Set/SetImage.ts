import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    BaseEntity,
    ManyToOne,
} from "typeorm";
import {Set} from './Set'



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
