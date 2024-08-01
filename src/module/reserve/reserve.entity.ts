import { BaseEntity } from '#src/core/database';
import { Column, Entity } from 'typeorm';

@Entity()
export class ReserveEntity extends BaseEntity {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  mobile: string;

  @Column()
  email: string;

  @Column()
  company: number;

  @Column()
  type: number;

  @Column()
  model: number;

  @Column()
  chassis_number: number;

  // chassis_number + uuid
  @Column()
  issue_tracking: number;

  // TODO add date reserve

  @Column()
  state: number;

  @Column()
  description: string;

  @Column()
  plaque: string;
}
