import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarCompanyEntity } from './entities/car-company.entity';
import { Repository } from 'typeorm';
import { CreateCarCompanyDto } from './dto/create-car-company.dto';
import { CarTypeEntity } from './entities/car-type.entity';
import { CreateCarTypeDto } from './dto/create-car-type.dto';
import { CarModelEntity } from './entities/car-model.entity';
import { CreateCarModelDto } from './dto/create-car-model.dto';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarCompanyEntity)
    private readonly carCompanyRepository: Repository<CarCompanyEntity>,

    @InjectRepository(CarTypeEntity)
    private readonly carTypeRepository: Repository<CarTypeEntity>,

    @InjectRepository(CarModelEntity)
    private readonly carModelRepository: Repository<CarModelEntity>,
  ) {}

  /* -------------------------------------------------------------------------- */
  /*                                 CarCompany                                 */
  /* -------------------------------------------------------------------------- */
  async createCompany(
    createCarCompanyDto: CreateCarCompanyDto,
  ): Promise<CarCompanyEntity> {
    const company = this.carCompanyRepository.create(createCarCompanyDto);
    return await this.carCompanyRepository.save(company);
  }

  async findAllCompany(): Promise<CarCompanyEntity[]> {
    return await this.carCompanyRepository.find();
  }

  async findOneCompany(id: number): Promise<CarCompanyEntity> {
    return await this.carCompanyRepository.findOne({ where: { id } });
  }

  async updateCompany(
    id: number,
    updateCarCompanyDto: CreateCarCompanyDto,
  ): Promise<CarCompanyEntity> {
    await this.carCompanyRepository.update(id, updateCarCompanyDto);
    return this.findOneCompany(id);
  }

  async removeCompany(id: number): Promise<void> {
    await this.carCompanyRepository.delete(id);
  }

  /* -------------------------------------------------------------------------- */
  /*                                   CarType                                  */
  /* -------------------------------------------------------------------------- */

  async createType(createCarTypeDto: CreateCarTypeDto): Promise<CarTypeEntity> {
    console.log(createCarTypeDto);

    const carType = this.carTypeRepository.create(createCarTypeDto);
    return await this.carTypeRepository.save(carType);
  }

  //TODO with company
  async findAllType(): Promise<CarTypeEntity[]> {
    return await this.carTypeRepository.find();
  }

  async findOneType(id: number): Promise<CarTypeEntity> {
    return await this.carTypeRepository.findOne({ where: { id } });
  }

  async updateType(
    id: number,
    updateCarTypeDto: CreateCarTypeDto,
  ): Promise<CarTypeEntity> {
    await this.carTypeRepository.update(id, updateCarTypeDto);
    return this.findOneType(id);
  }

  async removeType(id: number): Promise<void> {
    await this.carTypeRepository.delete(id);
  }

  async findTypesByCompany(companyId: number): Promise<CarTypeEntity[]> {
    return this.carTypeRepository.find({
      where: { company: { id: companyId } },
      relations: ['company'],
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                                  CarModel                                  */
  /* -------------------------------------------------------------------------- */
  async createModel(
    createCarModelDto: CreateCarModelDto,
  ): Promise<CarModelEntity> {
    const carModel = this.carModelRepository.create(createCarModelDto);
    return await this.carModelRepository.save(carModel);
  }

  //TODO with types and company
  async findAllModel(): Promise<CarModelEntity[]> {
    return await this.carModelRepository.find();
  }

  async findOneModel(id: number): Promise<CarModelEntity> {
    return await this.carModelRepository.findOne({ where: { id } });
  }

  async updateModel(
    id: number,
    updateCarModelDto: CreateCarModelDto,
  ): Promise<CarModelEntity> {
    await this.carModelRepository.update(id, updateCarModelDto);
    return this.findOneModel(id);
  }

  async removeModel(id: number): Promise<void> {
    await this.carModelRepository.delete(id);
  }

  async findModelsByType(typeId: number): Promise<CarModelEntity[]> {
    return this.carModelRepository.find({
      where: { type: { id: typeId } },
      relations: ['type'],
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                               CarAggregationInfo                               */
  /* -------------------------------------------------------------------------- */
  async findAllCarAggregationInfo(): Promise<object[]> {
    try {
      const companies = await this.carCompanyRepository.find({
        relations: ['types'],
      });
      const CarCombineInfo = await Promise.all(
        companies.map(async (company) => {
          const typesWithModels = await Promise.all(
            company.types.map(async (type) => {
              const models = await this.carTypeRepository.find({
                relations: ['models'],
                where: { id: type.id },
              });
              return {
                ...type,
                models: models[0]?.models || [],
              };
            }),
          );
          return {
            ...company,
            types: typesWithModels,
          };
        }),
      );
      return CarCombineInfo;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
