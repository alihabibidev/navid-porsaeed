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

  // chassis_number + Date.now() = chassis_number-Date.now()
  @Column()
  issue_tracking: number;

  @Column()
  car_company: string;

  @Column()
  car_type: string;

  @Column()
  car_model: string;

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

  @Column('enum', {
    enum: ReserveHoursEnum,
  })
  hours: ReserveHoursEnum;

  @Column('enum', {
    enum: ReserveStateEnum,
    default: ReserveStateEnum.REQUEST_USER,
  })
  state: ReserveStateEnum;

  @Column()
  description: string;

  @Column()
  plaque: string;
}
