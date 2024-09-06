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
import { AllDaysPossibleService } from './all-days-possible.service';
import { Public } from '#src/common/decorators';
import { AllDaysPossibleEntity } from './all-days-possible.entity';

@Controller('all-days-possible')
export class AllDaysPossibleController {
  constructor(private readonly dayService: AllDaysPossibleService) {}

  //   POST /all-days-possible
  @Public()
  @Post()
  async createDaysForYear(@Body('year') year: number): Promise<boolean> {
    return this.dayService.createDaysForYear(year);
  }

  //   GET /all-days-possible?year=1403&page=1&limit=10
  @Public()
  @Get()
  async getDaysForYear(
    @Query('year') year: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 8,
    @Query('futureOnly') futureOnly: string = 'false',
  ): Promise<{ data: AllDaysPossibleEntity[]; total: number }> {
    if (!year) {
      throw new HttpException('Year is required', HttpStatus.BAD_REQUEST);
    }

    const { data, total } = await this.dayService.getDaysForYear(
      year,
      page,
      limit,
      futureOnly === 'true', // تبدیل پارامتر به boolean
    );

    return { data, total };
  }

  //   PATCH /all-days-possible/:id
  @Patch(':id')
  async updateDay(
    @Param('id') id: number,
    @Body() updateData: Partial<AllDaysPossibleEntity>,
  ): Promise<AllDaysPossibleEntity> {
    const updatedDay = await this.dayService.updateDay(id, updateData);

    return updatedDay;
  }
}
