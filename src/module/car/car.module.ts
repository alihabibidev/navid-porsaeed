import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarCompanyEntity } from './entities/car-company.entity';
import { CarTypeEntity } from './entities/car-type.entity';
import { CarModelEntity } from './entities/car-model.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarCompanyEntity, CarTypeEntity, CarModelEntity]),
  ],
})
export class CarModule {}
