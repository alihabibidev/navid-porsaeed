import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { AllDaysPossibleEntity } from './all-days-possible.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as jalaali from 'jalaali-js'; // Import jalaali-js

@Injectable()
export class AllDaysPossibleService {
  constructor(
    @InjectRepository(AllDaysPossibleEntity)
    private dayRepository: Repository<AllDaysPossibleEntity>,
    private configService: ConfigService, // تزریق ConfigService
  ) {}

  async getDaysForYear(
    year: number,
    page: number,
    limit: number,
    futureOnly: boolean,
  ): Promise<{ data: AllDaysPossibleEntity[]; total: number }> {
    const offset = (page - 1) * limit;

    // گرفتن تاریخ و زمان فعلی و تبدیل آن به جلالی
    const now = new Date();
    const jalaaliDate = jalaali.toJalaali(
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate(),
    );
    const currentYear = jalaaliDate.jy;
    const currentMonth = jalaaliDate.jm;
    const currentDay = jalaaliDate.jd;

    const queryBuilder = this.dayRepository.createQueryBuilder('day');

    queryBuilder.where('day.year = :year', { year });

    if (futureOnly) {
      queryBuilder.andWhere(
        '(day.year > :currentYear OR (day.year = :currentYear AND (day.month > :currentMonth OR (day.month = :currentMonth AND day.day > :currentDay))))',
        {
          currentYear,
          currentMonth,
          currentDay,
        },
      );
    }

    queryBuilder.orderBy('day.month', 'ASC').addOrderBy('day.day', 'ASC');
    queryBuilder.skip(offset).take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return { data, total };
  }

  // async getDaysForYear(
  //   year: number,
  //   page: number,
  //   limit: number,
  //   futureOnly: boolean, // پارامتر برای مشخص کردن نوع فیلتر
  // ): Promise<{ data: AllDaysPossibleEntity[]; total: number }> {
  //   const offset = (page - 1) * limit;

  //   // گرفتن تاریخ و زمان فعلی و تبدیل آن به جلالی
  //   const now = new Date();
  //   const jalaaliDate = jalaali.toJalaali(
  //     now.getFullYear(),
  //     now.getMonth() + 1,
  //     now.getDate(),
  //   );
  //   const currentYear = jalaaliDate.jy;
  //   const currentMonth = jalaaliDate.jm;
  //   const currentDay = jalaaliDate.jd;

  //   // شرط فیلتر براساس پارامتر futureOnly
  //   const whereCondition = futureOnly
  //     ? {
  //         year,
  //         $or: [
  //           {
  //             year: currentYear,
  //             month: currentMonth,
  //             day: { $gte: currentDay },
  //           },
  //           { year: currentYear, month: { $gt: currentMonth } },
  //           { year: { $gt: currentYear } },
  //         ],
  //       }
  //     : { year };

  //   const [data, total] = await this.dayRepository.findAndCount({
  //     where: whereCondition,
  //     order: { month: 'ASC', day: 'ASC' },
  //     skip: offset,
  //     take: limit,
  //   });

  //   return { data, total };
  // }

  async updateDay(
    id: number,
    updateData: Partial<AllDaysPossibleEntity>,
  ): Promise<AllDaysPossibleEntity> {
    const day = await this.dayRepository.findOne({ where: { id } });

    if (!day) {
      throw new HttpException('Day not found', HttpStatus.NOT_FOUND);
    }

    //TODO validation reserve_at 8,9,10,11
    //TODO just uptdate capacity 8,9,10,11 and isHoliday

    if (!day) {
      throw new HttpException('Day not found', HttpStatus.NOT_FOUND);
    }

    Object.assign(day, updateData);

    return await this.dayRepository.save(day);
  }

  // تاریخ شمسی یا همان تقویم جلالی
  async createDaysForYear(year: number): Promise<boolean> {
    const data = [];

    // آرایه‌ای برای نام‌های ماه‌های شمسی
    const monthNames = [
      'فروردین',
      'اردیبهشت',
      'خرداد',
      'تیر',
      'مرداد',
      'شهریور',
      'مهر',
      'آبان',
      'آذر',
      'دی',
      'بهمن',
      'اسفند',
    ];

    // آرایه‌ای برای تعداد روزهای هر ماه شمسی
    const daysInEachMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29]; // برای سال‌های عادی

    // بررسی و تنظیم تعداد روزهای اسفند در سال کبیسه
    if (this.isLeapYear(year)) {
      daysInEachMonth[11] = 30; // اگر سال کبیسه است، اسفند 30 روز دارد
    } else {
      daysInEachMonth[11] = 29; // اگر غیر کبیسه است، اسفند 29 روز دارد
    }

    // آرایه روزهای هفته به فارسی
    const jalaliWeekDays = [
      'شنبه',
      'یکشنبه',
      'دوشنبه',
      'سه‌شنبه',
      'چهارشنبه',
      'پنجشنبه',
      'جمعه',
    ];

    for (let month = 1; month <= 12; month++) {
      const daysInMonth = daysInEachMonth[month - 1];

      // لاگ کردن نام ماه شمسی
      //   console.log(
      //     `ماه: ${monthNames[month - 1]} - تعداد روزها: ${daysInMonth}`,
      //   );

      for (let day = 1; day <= daysInMonth; day++) {
        const gregorianDate = jalaali.toGregorian(year, month, day); // تبدیل تاریخ جلالی به میلادی
        const date = new Date(
          gregorianDate.gy,
          gregorianDate.gm - 1,
          gregorianDate.gd,
        ); // ساخت شیء تاریخ میلادی
        const weekdayNumber = date.getDay(); // 0=یکشنبه, 6=شنبه
        // 0 - یکشنبه(Sunday);
        // 1 - دوشنبه(Monday);
        // 2 - سه‌شنبه(Tuesday);
        // 3 - چهارشنبه(Wednesday);
        // 4 - پنج‌شنبه(Thursday);
        // 5 - جمعه(Friday);
        // 6 - شنبه(Saturday);
        const weekdayName = jalaliWeekDays[(weekdayNumber + 1) % 7]; // نام روز هفته به فارسی
        const timestamp = Math.floor(date.getTime() / 1000); // تبدیل به timestamp

        const isHoliday = weekdayName === 'جمعه'; // بررسی روز تعطیل
        // const isHoliday = this.checkIfHoliday(date); // تابعی برای بررسی تعطیلات

        // خواندن ظرفیت‌ها از ConfigService
        const capacityAt8 = this.configService.getOrThrow<number>(
          'reserve.r_capacity_at_8',
        ); // خواندن ظرفیت ساعت 8

        const capacityAt9 = this.configService.getOrThrow<number>(
          'reserve.r_capacity_at_9',
        ); // خواندن ظرفیت ساعت 9

        const capacityAt10 = this.configService.getOrThrow<number>(
          'reserve.r_capacity_at_10',
        ); // خواندن ظرفیت ساعت 10

        const capacityAt11 = this.configService.getOrThrow<number>(
          'reserve.r_capacity_at_11',
        ); // خواندن ظرفیت ساعت 11

        const reservationsAt8 = 0; // تعداد رزروهای اولیه
        const reservationsAt9 = 0;
        const reservationsAt10 = 0;
        const reservationsAt11 = 0;

        data.push({
          year,
          month,
          day,
          weekdayNumber: (weekdayNumber + 1) % 7, // تطبیق روزهای میلادی با روزهای شمسی
          weekdayName,
          monthNames: monthNames[month - 1],
          timestamp,
          isHoliday,
          capacityAt8,
          capacityAt9,
          capacityAt10,
          capacityAt11,
          reservationsAt8,
          reservationsAt9,
          reservationsAt10,
          reservationsAt11,
        });
      }
    }

    // ذخیره اطلاعات در دیتابیس
    await this.dayRepository.save(data);
    return true;
  }

  private isLeapYear(year: number): boolean {
    // بررسی کبیسه بودن سال
    return jalaali.isLeapJalaaliYear(year);
  }

  private checkIfHoliday(date: Date): boolean {
    // منطق خود را برای بررسی تعطیلات اینجا پیاده‌سازی کنید
    const jDate = jalaali.toJalaali(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
    ); // تبدیل تاریخ میلادی به جلالی

    const formattedJDate = `${jDate.jy}-${String(jDate.jm).padStart(
      2,
      '0',
    )}-${String(jDate.jd).padStart(2, '0')}`;

    const holidayDates = ['1402-01-01', '1402-01-12']; // تاریخ‌های تعطیل به صورت شمسی
    return holidayDates.includes(formattedJDate);
  }
}
