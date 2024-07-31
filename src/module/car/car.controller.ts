import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCarCompanyDto } from './dto/create-car-company.dto';
import { CarService } from './car.service';
import { CarCompanyEntity } from './entities/car-company.entity';
import { CreateCarTypeDto } from './dto/create-car-type.dto';
import { CarTypeEntity } from './entities/car-type.entity';
import { CarModelEntity } from './entities/car-model.entity';
import { CreateCarModelDto } from './dto/create-car-model.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carCompanyService: CarService) {}

  @Post('company')
  createCompany(
    @Body() createCarCompanyDto: CreateCarCompanyDto,
  ): Promise<CarCompanyEntity> {
    return this.carCompanyService.createCompany(createCarCompanyDto);
  }

  @Get('company')
  findAllCompany(): Promise<CarCompanyEntity[]> {
    return this.carCompanyService.findAllCompany();
  }

  @Get('company/:id')
  findOneCompany(@Param('id') id: number): Promise<CarCompanyEntity> {
    return this.carCompanyService.findOneCompany(id);
  }

  @Patch('company/:id')
  updateCompany(
    @Param('id') id: number,
    @Body() updateCarCompanyDto: CreateCarCompanyDto,
  ): Promise<CarCompanyEntity> {
    return this.carCompanyService.updateCompany(id, updateCarCompanyDto);
  }

  @Delete('company/:id')
  removeCompany(@Param('id') id: number): Promise<void> {
    return this.carCompanyService.removeCompany(id);
  }

  @Post('type')
  createType(
    @Body() createCarTypeDto: CreateCarTypeDto,
  ): Promise<CarTypeEntity> {
    return this.carCompanyService.createType(createCarTypeDto);
  }

  @Get('type')
  findAllType(): Promise<CarTypeEntity[]> {
    return this.carCompanyService.findAllType();
  }

  @Get('type/:id')
  findOneType(@Param('id') id: number): Promise<CarTypeEntity> {
    return this.carCompanyService.findOneType(id);
  }

  @Patch('type/:id')
  updateType(
    @Param('id') id: number,
    @Body() updateCarTypeDto: CreateCarTypeDto,
  ): Promise<CarTypeEntity> {
    return this.carCompanyService.updateType(id, updateCarTypeDto);
  }

  @Delete('type/:id')
  removeType(@Param('id') id: number): Promise<void> {
    return this.carCompanyService.removeType(id);
  }

  /* -------------------------------------------------------------------------- */
  /*                                  CarModel                                  */
  /* -------------------------------------------------------------------------- */
  @Post('model')
  createModel(
    @Body() createCarModelDto: CreateCarModelDto,
  ): Promise<CarModelEntity> {
    return this.carCompanyService.createModel(createCarModelDto);
  }

  @Get('model')
  findAllModel(): Promise<CarModelEntity[]> {
    return this.carCompanyService.findAllModel();
  }

  @Get('model/:id')
  findOneModel(@Param('id') id: number): Promise<CarModelEntity> {
    return this.carCompanyService.findOneModel(id);
  }

  @Patch('model/:id')
  updateModel(
    @Param('id') id: number,
    @Body() updateCarModelDto: CreateCarModelDto,
  ): Promise<CarModelEntity> {
    return this.carCompanyService.updateModel(id, updateCarModelDto);
  }

  @Delete('model/:id')
  removeModel(@Param('id') id: number): Promise<void> {
    return this.carCompanyService.removeModel(id);
  }

  /* -------------------------------------------------------------------------- */
  /*                               CarAggregationInfo                               */
  /* -------------------------------------------------------------------------- */
  @Get('aggregation')
  findAllCarAggregationInfo(): Promise<object[]> {
    return this.carCompanyService.findAllCarAggregationInfo();
  }
}
