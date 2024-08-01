import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AllDaysPossiblleService } from './all-days-possiblle.service';
import { Public } from '#src/common/decorators';
import { AllDaysPossibleEntity } from './all-days-possiblle.entity';

@Controller('all-days-possiblle')
export class AllDaysPossiblleController {
  constructor(private readonly dayService: AllDaysPossiblleService) {}

  //   POST /all-days-possiblle
  @Public()
  @Post()
  async createDaysForYear(@Body('year') year: number): Promise<boolean> {
    return this.dayService.createDaysForYear(year);
  }

  //   GET /all-days-possiblle?year=1403&page=1&limit=10
  @Get()
  async getDaysForYear(
    @Query('year') year: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ data: AllDaysPossibleEntity[]; total: number }> {
    if (!year) {
      throw new HttpException('Year is required', HttpStatus.BAD_REQUEST);
    }

    const { data, total } = await this.dayService.getDaysForYear(
      year,
      page,
      limit,
    );

    return { data, total };
  }

  //   PATCH /all-days-possiblle/:id
  @Patch(':id')
  async updateDay(
    @Param('id') id: number,
    @Body() updateData: Partial<AllDaysPossibleEntity>,
  ): Promise<AllDaysPossibleEntity> {
    const updatedDay = await this.dayService.updateDay(id, updateData);

    if (!updatedDay) {
      throw new HttpException('Day not found', HttpStatus.NOT_FOUND);
    }

    return updatedDay;
  }
}
