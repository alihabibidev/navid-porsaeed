import { BaseEntity } from '#src/core/database';
import { Column, Entity } from 'typeorm';
import { ReserveHoursEnum, ReserveStateEnum } from './reserve.enum';

@Entity()
export class ReserveEntity extends BaseEntity {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  mobile: string;

  @Column({ nullable: true, default: null })
  email: string;

  @Column()
  companyId: number;

  @Column()
  typeId: number;

  @Column()
  modelId: number;

  @Column()
  chassis_number: string;

  // chassis_number + Date.now() = chassis_number-Date.now()
  @Column()
  issue_tracking: string;

  @Column()
  company_name: string;

  @Column()
  type_name: string;

  @Column()
  model_name: string;

  @Column()
  allDaysPossibleId: number;

  @Column()
  year: number;

  @Column()
  month: number;

  @Column()
  day: number;

  @Column()
  weekdayNumber: number;

  @Column()
  weekdayName: string;

  @Column()
  monthNames: string;

  @Column()
  reason: string;

  @Column('enum', {
    enum: ReserveHoursEnum,
  })
  hours: ReserveHoursEnum;

  @Column('enum', {
    enum: ReserveStateEnum,
    default: ReserveStateEnum.REQUEST_USER,
  })
  state: ReserveStateEnum;

  @Column({ nullable: true, default: null })
  description: string;

  @Column()
  plaque: string;
}
