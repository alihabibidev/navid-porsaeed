import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ReserveStateEnum } from '../reserve.enum';
import { Type } from 'class-transformer';

export class GetReservesFilterDto {
  @IsOptional()
  @IsEnum(ReserveStateEnum)
  state?: ReserveStateEnum;

  @IsOptional()
  @IsString()
  startDate?: string; // تاریخ شروع بازه زمانی (ISO format)

  @IsOptional()
  @IsString()
  endDate?: string; // تاریخ پایان بازه زمانی (ISO format)

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)

  @Min(1)
  limit?: number;
}
