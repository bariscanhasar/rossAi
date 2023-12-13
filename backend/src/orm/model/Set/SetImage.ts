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
    replicateId!: string;


    @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
    createdAt?: Date;


    @ManyToOne(() => Set, (set) => set.images)
    set!: Set;


}
