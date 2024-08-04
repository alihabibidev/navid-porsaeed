// src/module/reserve/reserve.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { CreateReserveDto } from './dto/create-reserve.dto';
import { ReserveEntity } from './reserve.entity';

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
}
