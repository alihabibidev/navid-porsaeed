import { BaseEntity } from '#src/core/database';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CarTypeEntity } from './car-type.entity';

@Entity()
export class CarModelEntity extends BaseEntity {
  @Column({ nullable: true })
  name: string;

  // @Column()
  // typeId: number;

  @ManyToOne(() => CarTypeEntity, (type) => type.models, {
    onDelete: 'CASCADE',
  })
  type: CarTypeEntity;
}
