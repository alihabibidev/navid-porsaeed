import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarCompanyEntity } from './entities/car-company.entity';
import { CarTypeEntity } from './entities/car-type.entity';
import { CarModelEntity } from './entities/car-model.entity';
import { CarService } from './car.service';
import { CarController } from './car.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarCompanyEntity, CarTypeEntity, CarModelEntity]),
  ],
  providers: [CarService],
  controllers: [CarController],
})
export class CarModule {}
