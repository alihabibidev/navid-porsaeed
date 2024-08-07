// src/module/reserve/reserve.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Query,
  Param,
  Patch,
} from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { CreateReserveDto } from './dto/create-reserve.dto';
import { ReserveEntity } from './reserve.entity';
import { GetReservesFilterDto } from './dto/get-reserves-filter.dto';

@Controller('reserve')
export class ReserveController {
  constructor(private readonly reserveService: ReserveService) {}

  @Post()
  async createReserve(
    @Body() createReserveDto: CreateReserveDto,
  ): Promise<ReserveEntity> {
    try {
      return await this.reserveService.createReserve(createReserveDto);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // GET /reserves?page=1&limit=10&state=REQUEST_USER&startDate=1403-05-01&endDate=1403-05-31
  @Get()
  async getReserves(
    @Query() filterDto: GetReservesFilterDto,
  ): Promise<{ data: ReserveEntity[]; count: number }> {
    return await this.reserveService.getReserves(filterDto);
  }

  // GET /reserves/chassis/1234567890
  @Get('/chassis/:chassisNumber')
  async getReservesByChassisNumber(
    @Param('chassisNumber') chassisNumber: string,
  ): Promise<ReserveEntity[]> {
    return await this.reserveService.getReservesByChassisNumber(chassisNumber);
  }

  // PATCH /reserves/cancel/123
  @Patch('/cancel/:id')
  async cancelReserveIfWithin24Hours(
    @Param('id') reserveId: string,
  ): Promise<ReserveEntity> {
    try {
      return await this.reserveService.cancelIfWithin24Hours(reserveId);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
