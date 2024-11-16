import { Cascade, Entity, ManyToOne, Property, Collection, DateType, Rel, DateTimeType, OneToOne } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { HealthInsurance } from "./healthinsurance.entity.js";

@Entity()
export class Patient extends BaseEntity {

    @Property({ nullable: false })
    firstname!: string

    @Property({ nullable: false })
    lastname!: string

    @Property({ nullable: false })
    dni!: string

    @Property({ nullable: false })
    phoneNumber!: string

    @Property({ nullable: false })
    address!: string

    @Property({ nullable: false })
    email!: string

    @Property({ type: 'date', nullable: false })
    birthDate!: Date;

    @Property({ nullable: true })
    grupoSanguineo!: string

    @Property({ nullable: true })
    antecedentesPersonales!: string

    @Property({ nullable: true })
    antecedentesFamiliares!: string

    @ManyToOne(() => HealthInsurance, { nullable: true })
    healthInsurance?: Rel<HealthInsurance>




}