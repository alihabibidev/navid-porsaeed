import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllDaysPossibleEntity } from './all-days-possible.entity';
import { AllDaysPossibleController } from './all-days-possible.controller';
import { AllDaysPossibleService } from './all-days-possible.service';

@Module({
  imports: [TypeOrmModule.forFeature([AllDaysPossibleEntity])],
  controllers: [AllDaysPossibleController],
  providers: [AllDaysPossibleService],
})
export class AllDaysPossibleModule {}
