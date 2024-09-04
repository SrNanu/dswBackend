import { Cascade, Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Medic } from '../Medic/medic.entity.js';

@Entity()
export class Specialty extends BaseEntity {
  @Property({ nullable: false })
  code!: number;

  @Property({ nullable: false })
  name!: string;

  @OneToMany(() => Medic, (medic) => medic.specialty, {cascade: [Cascade.ALL]})
  medics = new Collection<Medic>(this)
}