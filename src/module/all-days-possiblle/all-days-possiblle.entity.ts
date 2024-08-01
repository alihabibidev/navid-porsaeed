import { BaseEntity } from '#src/core/database';
import { Column, Entity } from 'typeorm';

@Entity()
export class AllDaysPossibleEntity extends BaseEntity {
  @Column({ nullable: true })
  @Column()
  year: number;

  @Column()
  month: number;

  @Column()
  day: number;

  @Column()
  timestamp: number;

  @Column()
  weekdayNumber: number;

  @Column()
  weekdayName: string;

  @Column()
  monthNames: string;

  @Column({ default: false })
  isHoliday: boolean; // آیا امروز تعطیل است؟

  @Column()
  capacityAt8: number; // ظرفیت رزرو ساعت 8

  @Column()
  capacityAt9: number; // ظرفیت رزرو ساعت 9

  @Column()
  capacityAt10: number; // ظرفیت رزرو ساعت 10

  @Column()
  capacityAt11: number; // ظرفیت رزرو ساعت 11

  @Column({ default: 0 })
  reservationsAt8: number; // تعداد رزروهای ساعت 8

  @Column({ default: 0 })
  reservationsAt9: number; // تعداد رزروهای ساعت 9

  @Column({ default: 0 })
  reservationsAt10: number; // تعداد رزروهای ساعت 10

  @Column({ default: 0 })
  reservationsAt11: number; // تعداد رزروهای ساعت 11
}
