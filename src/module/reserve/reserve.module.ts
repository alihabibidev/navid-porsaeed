import { Module } from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { ReserveController } from './reserve.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReserveEntity } from './reserve.entity';
import { AllDaysPossibleEntity } from '../all-days-possible/all-days-possible.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReserveEntity, AllDaysPossibleEntity])],
  providers: [ReserveService],
  controllers: [ReserveController],
  exports: [ReserveService],
})
export class ReserveModule {}
