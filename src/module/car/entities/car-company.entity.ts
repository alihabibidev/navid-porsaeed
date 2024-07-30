import { BaseEntity } from '#src/core/database';
import { Column, Entity, OneToMany } from 'typeorm';
import { CarTypeEntity } from './car-type.entity';

@Entity()
export class CarCompanyEntity extends BaseEntity {
  @Column({ nullable: true })
  name: string;

  @OneToMany(() => CarTypeEntity, (carType) => carType.company, {
    onDelete: 'CASCADE',
  })
  types: CarTypeEntity[];
}
