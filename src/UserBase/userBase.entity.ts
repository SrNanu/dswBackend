import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";

@Entity()
export abstract class UserBase extends BaseEntity {
  @Property({ nullable: false, unique: true })
  username!: string;

  @Property({ nullable: false })
  password!: string;

  @Property({ nullable: false })
  role!: "MEDIC" | "SECRETARY"; // Define el rol
}
