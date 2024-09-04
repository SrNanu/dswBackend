import { Entity, Property, Rel, ManyToOne } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { Specialty } from "../Specialty/specialty.entity.js";

@Entity()
export class Medic extends BaseEntity {

    @Property({ nullable: false })
    dni!: string

    @Property({ nullable: false })
    firstname!: string

    @Property({ nullable: false })
    lastname!: string

    @Property({ nullable: false })
    DniType!: string

    @Property({ nullable: true })
    Username!: string

    @Property({ nullable: true })
    Password!: string

    @Property({ nullable: true })
    MedicalConsultationValue!: number

    @Property({ nullable: true })
    license!: number

    @ManyToOne(() => Specialty, { nullable: true })
        specialty!: Rel<Specialty>
        }
