import { Entity, Property, PrimaryKey } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";


@Entity()
export class Secretary extends BaseEntity {

  @Property({ nullable: false })
  dni!: number

  @Property({ nullable: false })
  firstname!: string

  @Property({ nullable: false })
  lastname!: string

  @Property({ nullable: false })
  Username!: string

  @Property({ nullable: false })
  Password!: string

}