import { Cascade, Entity, ManyToOne, Property, Collection, DateType, Rel, DateTimeType, OneToOne, OneToMany } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { ConsultationHours } from "../Medic/consultationHours.entity.js";
import { Patient } from "../Patient/patient.entity.js";

@Entity()
export class Attention extends BaseEntity {

    @Property({nullable: false})
    date!: Date
    
    @Property({nullable: false})
    paymentDate!: Date

    @Property({nullable: false})
    result!: string

    @Property({nullable: false})
    reason!: string

    @Property({nullable: false})
    currentIllness!: string

    @Property({nullable: false})
    vitalSigns!: string

    @Property({ nullable: false })
    physicalExamination!: string;

    @Property({ nullable: false })
    diagnosis!: string;

    @Property({ nullable: false })
    treatment!: string;

    @Property({ nullable: false })
    observation!: string;

    @Property({ nullable: true })
    dateCancelled!: Date;

    @ManyToOne(() => ConsultationHours, {nullable: true})
    consultationHours?: Rel<ConsultationHours>
    
    @ManyToOne(() => Patient, {nullable: true})
    patient?: Rel<Patient>
   
    
}