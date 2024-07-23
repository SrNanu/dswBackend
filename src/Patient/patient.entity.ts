import { Cascade, Entity, ManyToOne, Property, Collection, DateType, Rel } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { HealthInsurance } from "./healthinsurance.entity.js";

@Entity()
export class Patient extends BaseEntity {

    @Property({nullable: false})
    firstname!: string
    
    @Property({nullable: false})
    lastname!: string

    @Property({nullable: false})
    dni!: string

    @Property({nullable: false})
    phoneNumber!: string

    @Property({nullable: false})
    address!: string

    @Property({nullable: false})
    email!: string

    @Property({nullable: false})
    birthDate!: DateType

    @ManyToOne(() => HealthInsurance, {nullable: true})
    healthInsurance?: Rel<HealthInsurance>
   
    
}