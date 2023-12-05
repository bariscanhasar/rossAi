import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, BaseEntity} from "typeorm";
import {StyleDetails} from "../Style/StyleDetails";
import {ReplicateModel} from "../Replicate/ReplicateModel";
import {Set} from '../Set/Set'
import {Credit} from "../Credit/Credit";

enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    SUPERADMN = "SUPERADMIN"
}

enum DeviceType {
    IOS = "IOS",
    ANDROID = "ANDROID",
    WEB = "WEB"
}
@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({nullable:true,})
    first_name?: string;

    @Column({nullable:true,})
    last_name?: string;

    @Column({nullable:true,})
    email?: string;

    @Column({
        type: "enum",
        enum: Role, // Use the enum you've defined
        default: Role.USER
    })
    role?: Role;


    @Column({
        type: "enum",
        enum: DeviceType, // Use the enum you've defined
        default: DeviceType.IOS

    })
    device_type?: DeviceType;

    @Column({
        nullable:true,
        default: "123"
    })
    keychain?: string;


    @Column({nullable:true,})
    is_agreement_checked?: boolean;

    @Column({nullable:true,})
    is_premium?: boolean;

    @Column({nullable:true,})
    sub_id?: string;

    @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;

    @OneToMany(() => Credit, (credit) => credit.user)
    credit?: Credit

    @OneToMany(() => ReplicateModel, (replicateModel) => replicateModel.user)
    replicate_model?: ReplicateModel[];

    @OneToMany(() => Set, (set) => set.user)
    set?: Set;

}




