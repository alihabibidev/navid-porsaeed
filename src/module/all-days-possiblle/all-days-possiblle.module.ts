import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllDaysPossibleEntity } from './all-days-possiblle.entity';
import { AllDaysPossiblleController } from './all-days-possiblle.controller';
import { AllDaysPossiblleService } from './all-days-possiblle.service';

@Module({
  imports: [TypeOrmModule.forFeature([AllDaysPossibleEntity])],
  controllers: [AllDaysPossiblleController],
  providers: [AllDaysPossiblleService],
})
export class AllDaysPossiblleModule {}
