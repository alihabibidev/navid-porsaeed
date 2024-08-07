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
import { adminRoleToUp } from '#src/common/constant/role.constant';
import { Roles } from '#src/common/decorators/roles.decorator';
import { Public } from '#src/common/decorators';

@Controller('car')
export class CarController {
  constructor(private readonly carCompanyService: CarService) {}

  @Roles(...adminRoleToUp)
  @Post('company')
  createCompany(
    @Body() createCarCompanyDto: CreateCarCompanyDto,
  ): Promise<CarCompanyEntity> {
    return this.carCompanyService.createCompany(createCarCompanyDto);
  }

  @Public()
  @Get('company')
  findAllCompany(): Promise<CarCompanyEntity[]> {
    return this.carCompanyService.findAllCompany();
  }

  @Public()
  @Get('company/:id')
  findOneCompany(@Param('id') id: number): Promise<CarCompanyEntity> {
    return this.carCompanyService.findOneCompany(id);
  }

  @Roles(...adminRoleToUp)
  @Patch('company/:id')
  updateCompany(
    @Param('id') id: number,
    @Body() updateCarCompanyDto: CreateCarCompanyDto,
  ): Promise<CarCompanyEntity> {
    return this.carCompanyService.updateCompany(id, updateCarCompanyDto);
  }

  @Roles(...adminRoleToUp)
  @Delete('company/:id')
  removeCompany(@Param('id') id: number): Promise<void> {
    return this.carCompanyService.removeCompany(id);
  }

  /* -------------------------------------------------------------------------- */
  /*                                   CarType                                  */
  /* -------------------------------------------------------------------------- */

  @Roles(...adminRoleToUp)
  @Post('type')
  createType(
    @Body() createCarTypeDto: CreateCarTypeDto,
  ): Promise<CarTypeEntity> {
    return this.carCompanyService.createType(createCarTypeDto);
  }

  @Public()
  @Get('type')
  findAllType(): Promise<CarTypeEntity[]> {
    return this.carCompanyService.findAllType();
  }

  @Public()
  @Get('type/:id')
  findOneType(@Param('id') id: number): Promise<CarTypeEntity> {
    return this.carCompanyService.findOneType(id);
  }

  @Roles(...adminRoleToUp)
  @Patch('type/:id')
  updateType(
    @Param('id') id: number,
    @Body() updateCarTypeDto: CreateCarTypeDto,
  ): Promise<CarTypeEntity> {
    return this.carCompanyService.updateType(id, updateCarTypeDto);
  }

  @Roles(...adminRoleToUp)
  @Delete('type/:id')
  removeType(@Param('id') id: number): Promise<void> {
    return this.carCompanyService.removeType(id);
  }

  @Public()
  @Get('company/:companyId/types')
  findTypesByCompany(
    @Param('companyId') companyId: number,
  ): Promise<CarTypeEntity[]> {
    return this.carCompanyService.findTypesByCompany(companyId);
  }

  /* -------------------------------------------------------------------------- */
  /*                                  CarModel                                  */
  /* -------------------------------------------------------------------------- */
  @Roles(...adminRoleToUp)
  @Post('model')
  createModel(
    @Body() createCarModelDto: CreateCarModelDto,
  ): Promise<CarModelEntity> {
    return this.carCompanyService.createModel(createCarModelDto);
  }

  @Public()
  @Get('model')
  findAllModel(): Promise<CarModelEntity[]> {
    return this.carCompanyService.findAllModel();
  }

  @Public()
  @Get('model/:id')
  findOneModel(@Param('id') id: number): Promise<CarModelEntity> {
    return this.carCompanyService.findOneModel(id);
  }

  @Roles(...adminRoleToUp)
  @Patch('model/:id')
  updateModel(
    @Param('id') id: number,
    @Body() updateCarModelDto: CreateCarModelDto,
  ): Promise<CarModelEntity> {
    return this.carCompanyService.updateModel(id, updateCarModelDto);
  }

  @Roles(...adminRoleToUp)
  @Delete('model/:id')
  removeModel(@Param('id') id: number): Promise<void> {
    return this.carCompanyService.removeModel(id);
  }

  @Public()
  @Get('type/:typeId/models')
  findModelsByType(@Param('typeId') typeId: number): Promise<CarModelEntity[]> {
    return this.carCompanyService.findModelsByType(typeId);
  }

  /* -------------------------------------------------------------------------- */
  /*                               CarAggregationInfo                               */
  /* -------------------------------------------------------------------------- */
  @Public()
  @Get('aggregation')
  findAllCarAggregationInfo(): Promise<object[]> {
    //TODO pagination
    return this.carCompanyService.findAllCarAggregationInfo();
  }
}
