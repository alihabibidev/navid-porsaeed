// src/module/reserve/reserve.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ReserveEntity } from './reserve.entity';
import { CreateReserveDto } from './dto/create-reserve.dto';
import { AllDaysPossibleEntity } from '../all-days-possible/all-days-possible.entity';
import { ReserveStateEnum } from './reserve.enum';

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
      // ایجاد رزرو جدید
      const reserve = this.reserveRepository.create({
        ...otherData,
        chassis_number,
        issue_tracking,
        allDaysPossibleId,
        hours,
      });

      const savedReserve = await queryRunner.manager.save(reserve);

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
