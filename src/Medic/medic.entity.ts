import { Entity, Property, Rel, ManyToOne, OneToMany, Collection, Cascade } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { Specialty } from "../Specialty/specialty.entity.js";
import { ConsultationHours } from "./consultationHours.entity.js";
import { UserBase } from "../UserBase/userBase.entity.js";

@Entity()
export class Medic extends UserBase {

    @Property({ nullable: false })
    dni!: string

    @Property({ nullable: false })
    firstname!: string

    @Property({ nullable: false })
    lastname!: string

    @Property({ nullable: false })
    dniType!: string

    @Property({ nullable: true })
    medicalConsultationValue!: number

    @Property({ nullable: true })
    license!: number

    @ManyToOne(() => Specialty, { nullable: true })
        specialty!: Rel<Specialty>
        
    @OneToMany(() => ConsultationHours, (consultationHours: ConsultationHours) => consultationHours.medic,{cascade: [Cascade.ALL], nullable: true})
    consultationHours = new Collection<ConsultationHours>(this)
}
