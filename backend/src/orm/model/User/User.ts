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
    firstName?: string;

    @Column({nullable:true,})
    lastName?: string;

    @Column({nullable:true,})
    email?: string;

    @Column({nullable:true,})
    password?: string;

    @Column({
        type: "enum",
        enum: Role,
        default: Role.USER
    })
    role?: Role;


    @Column({
        type: "enum",
        enum: DeviceType,
        default: DeviceType.IOS

    })
    deviceType?: DeviceType;

    @Column({
        nullable:true,
        default: "123"
    })
    keychain?: string;


    @Column({nullable:true,})
    isAgreementCheck?: boolean;

    @Column({nullable:true,})
    isPremium?: boolean;

    @Column({nullable:true,})
    subId?: string;

    @Column({nullable:true,})
    fcmId?: string;

    @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @OneToMany(() => Credit, (credit) => credit.user)
    credit?: Credit

    @OneToMany(() => ReplicateModel, (replicateModel) => replicateModel.user)
    replicateModel?: ReplicateModel[];

    @OneToMany(() => Set, (set) => set.user)
    set?: Set;

}




