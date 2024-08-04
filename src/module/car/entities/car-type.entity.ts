import { BaseEntity } from '#src/core/database';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CarCompanyEntity } from './car-company.entity';
import { CarModelEntity } from './car-model.entity';

@Entity()
export class CarTypeEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  companyId: number;

  @ManyToOne(() => CarCompanyEntity, (company) => company.types, {
    onDelete: 'CASCADE',
  })
  company: CarCompanyEntity;

  @OneToMany(() => CarModelEntity, (carModel) => carModel.type, {
    onDelete: 'CASCADE',
  })
  models: CarModelEntity[];
}
