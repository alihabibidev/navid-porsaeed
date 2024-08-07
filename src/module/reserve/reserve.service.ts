// src/module/reserve/reserve.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  DataSource,
  FindManyOptions,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { ReserveEntity } from './reserve.entity';
import { CreateReserveDto } from './dto/create-reserve.dto';
import { AllDaysPossibleEntity } from '../all-days-possible/all-days-possible.entity';
import { ReserveStateEnum } from './reserve.enum';
import { GetReservesFilterDto } from './dto/get-reserves-filter.dto';
import { convertJalaliToGregorian } from '#src/common/utils/date.utils';

@Injectable()
export class ReserveService {
  constructor(
    @InjectRepository(ReserveEntity)
    private reserveRepository: Repository<ReserveEntity>,
    @InjectRepository(AllDaysPossibleEntity)
    private allDaysPossibleRepository: Repository<AllDaysPossibleEntity>,
    private dataSource: DataSource,
  ) {}

  async createReserve(
    createReserveDto: CreateReserveDto,
  ): Promise<ReserveEntity> {
    //TODO validate date,capacity,hours, . . .
    const { chassis_number, allDaysPossibleId, hours, ...otherData } =
      createReserveDto;

    // چک کردن رزرو تکراری
    const existingReserve = await this.reserveRepository.findOne({
      where: {
        chassis_number,
        state: ReserveStateEnum.REQUEST_USER,
      },
    });

    if (existingReserve) {
      throw new HttpException(
        'A reservation with this chassis number is already in the REQUEST_USER state.',
        HttpStatus.CONFLICT,
      );
    }

    const timestamp = Date.now();
    const issue_tracking = `${chassis_number}-${timestamp}`;

    // آغاز تراکنش
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // پیدا کردن روز مربوطه در AllDaysPossibleEntity
      const dayRecord = await queryRunner.manager.findOne(
        AllDaysPossibleEntity,
        {
          where: {
            year: otherData.year,
            month: otherData.month,
            day: otherData.day,
          },
        },
      );

      if (!dayRecord) {
        throw new HttpException('Day not found', HttpStatus.NOT_FOUND);
      }

      if (hours === 8) {
        if (dayRecord.capacityAt8 === dayRecord.reservationsAt8) {
          throw new HttpException('Full Capacity', HttpStatus.BAD_REQUEST);
        }
      } else if (hours === 9) {
        if (dayRecord.capacityAt9 === dayRecord.reservationsAt9) {
          throw new HttpException('Full Capacity', HttpStatus.BAD_REQUEST);
        }
      } else if (hours === 10) {
        if (dayRecord.capacityAt10 === dayRecord.reservationsAt10) {
          throw new HttpException('Full Capacity', HttpStatus.BAD_REQUEST);
        }
      } else if (hours === 11) {
        if (dayRecord.capacityAt11 === dayRecord.reservationsAt11) {
          throw new HttpException('Full Capacity', HttpStatus.BAD_REQUEST);
        }
      }

      // بروزرسانی ظرفیت رزرو بر اساس ساعت رزرو شده
      switch (hours) {
        case 8:
          dayRecord.reservationsAt8 += 1;
          break;
        case 9:
          dayRecord.reservationsAt9 += 1;
          break;
        case 10:
          dayRecord.reservationsAt10 += 1;
          break;
        case 11:
          dayRecord.reservationsAt11 += 1;
          break;
        default:
          throw new HttpException(
            'Invalid hour for reservation',
            HttpStatus.BAD_REQUEST,
          );
      }

      // ذخیره تغییرات
      await queryRunner.manager.save(dayRecord);

      // ایجاد رزرو جدید
      const reserve = this.reserveRepository.create({
        ...otherData,
        chassis_number,
        issue_tracking,
        allDaysPossibleId,
        hours,
      });

      const savedReserve = await queryRunner.manager.save(reserve);

      // تایید تراکنش
      await queryRunner.commitTransaction();

      return savedReserve;
    } catch (error) {
      // در صورت بروز خطا، لغو تراکنش
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // در نهایت، آزادسازی منابع
      await queryRunner.release();
    }
  }

  async getReserves(
    filterDto: GetReservesFilterDto,
  ): Promise<{ data: ReserveEntity[]; count: number }> {
    const { state, startDate, endDate, page = 1, limit = 10 } = filterDto;

    // تنظیم پارامترهای جستجو
    const where: FindManyOptions<ReserveEntity>['where'] = {};

    // فیلتر بر اساس وضعیت
    if (state) {
      where.state = state;
    }

    // تبدیل تاریخ‌های جلالی به میلادی
    let startYear, startMonth, startDay;
    let endYear, endMonth, endDay;

    if (startDate) {
      const start = convertJalaliToGregorian(startDate);
      startYear = start.getFullYear();
      startMonth = start.getMonth() + 1; // ماه‌ها در جاوااسکریپت از 0 شروع می‌شوند
      startDay = start.getDate();
    }

    if (endDate) {
      const end = convertJalaliToGregorian(endDate);
      endYear = end.getFullYear();
      endMonth = end.getMonth() + 1;
      endDay = end.getDate();
    }

    // فیلتر بر اساس بازه زمانی
    if (startDate && endDate) {
      where.year = Between(startYear, endYear);
      where.month = Between(startMonth, endMonth);
      where.day = Between(startDay, endDay);
    } else if (startDate) {
      where.year = MoreThanOrEqual(startYear);
      where.month = MoreThanOrEqual(startMonth);
      where.day = MoreThanOrEqual(startDay);
    } else if (endDate) {
      where.year = LessThanOrEqual(endYear);
      where.month = LessThanOrEqual(endMonth);
      where.day = LessThanOrEqual(endDay);
    }

    // محاسبه offset برای صفحه‌بندی
    const offset = (page - 1) * limit;

    // دریافت رزروها از دیتابیس
    const [data, count] = await this.reserveRepository.findAndCount({
      where,
      skip: offset,
      take: limit,
      order: {
        year: 'DESC',
        month: 'DESC',
        day: 'DESC',
      },
    });

    return { data, count };
  }

  async getReservesByChassisNumber(
    chassisNumber: string,
  ): Promise<ReserveEntity[]> {
    return await this.reserveRepository.find({
      where: {
        chassis_number: chassisNumber,
      },
      order: {
        year: 'DESC',
        month: 'DESC',
        day: 'DESC',
      },
    });
  }

  async cancelIfWithin24Hours(reserveId: string): Promise<ReserveEntity> {
    // آغاز تراکنش
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // یافتن رزرو با استفاده از شناسه
      const reserve = await queryRunner.manager.findOne(ReserveEntity, {
        where: { id: +reserveId },
      });

      if (!reserve) {
        throw new HttpException('Reservation not found', HttpStatus.NOT_FOUND);
      }

      // تبدیل تاریخ رزرو به میلادی
      const reserveDate = convertJalaliToGregorian(
        `${reserve.year}-${reserve.month}-${reserve.day}`,
      );
      reserveDate.setHours(reserve.hours, 0, 0, 0); // تنظیم ساعت به ساعت رزرو

      // محاسبه تفاوت زمانی
      const now = new Date();
      const diffInMilliseconds = reserveDate.getTime() - now.getTime();
      const diffInHours = diffInMilliseconds / (1000 * 60 * 60);

      // بررسی اگر بیشتر از 24 ساعت به تاریخ رزرو مانده باشد
      if (diffInHours >= 24) {
        reserve.state = ReserveStateEnum.CANCELLED_USER;
        await queryRunner.manager.save(reserve);

        // یافتن روز مربوط به رزرو در جدول AllDaysPossibleEntity
        const dayRecord = await queryRunner.manager.findOne(
          AllDaysPossibleEntity,
          {
            where: {
              year: reserve.year,
              month: reserve.month,
              day: reserve.day,
            },
          },
        );

        if (!dayRecord) {
          throw new HttpException('Day not found', HttpStatus.NOT_FOUND);
        }

        // کاهش ظرفیت مربوطه بر اساس ساعت رزرو شده
        switch (reserve.hours) {
          case 8:
            dayRecord.reservationsAt8 -= 1;
            break;
          case 9:
            dayRecord.reservationsAt9 -= 1;
            break;
          case 10:
            dayRecord.reservationsAt10 -= 1;
            break;
          case 11:
            dayRecord.reservationsAt11 -= 1;
            break;
          default:
            throw new HttpException(
              'Invalid hour for reservation',
              HttpStatus.BAD_REQUEST,
            );
        }

        await queryRunner.manager.save(dayRecord);

        // تایید تراکنش
        await queryRunner.commitTransaction();

        return reserve;
      } else {
        throw new HttpException(
          'Reservation cannot be canceled. Less than 24 hours remain.',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      // در صورت بروز خطا، لغو تراکنش
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // آزادسازی منابع
      await queryRunner.release();
    }
  }
  //   async createReserve(
  //     createReserveDto: CreateReserveDto,
  //   ): Promise<ReserveEntity> {
  //     const { chassis_number, ...otherData } = createReserveDto;

  //     // محاسبه issue_tracking با ترکیب chassis_number و timestamp فعلی
  //     const timestamp = Date.now();
  //     const issue_tracking = `${chassis_number}-${timestamp}`;

  //     // ایجاد شیء جدید از نوع ReserveEntity
  //     const reserve = this.reserveRepository.create({
  //       ...otherData,
  //       chassis_number,
  //       issue_tracking,
  //     });

  //     // ذخیره شیء در دیتابیس
  //     return await this.reserveRepository.save(reserve);
  //   }
}
