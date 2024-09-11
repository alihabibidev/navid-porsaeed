import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { ReserveHoursEnum, ReserveStateEnum } from '../reserve.enum';

// export class CreateReserveDto {
//   first_name: string;
//   last_name: string;
//   mobile: string;
//   email: string;
//   companyId: number;
//   typeId: number;
//   modelId: number;
//   chassis_number: string;
//   company_name: string;
//   type_name: string;
//   model_name: string;
//   allDaysPossibleId: number;
//   year: number;
//   month: number;
//   day: number;
//   weekdayNumber: number;
//   weekdayName: string;
//   monthNames: string;
//   hours: ReserveHoursEnum;
//   description: string;
//   plaque: string;
// }

export class UpdateRepairDto {
  @IsInt()
  @IsOptional()
  allDaysPossibleId: number;

  @IsInt()
  @IsOptional()
  year: number;

  @IsInt()
  @IsOptional()
  month: number;

  @IsInt()
  @IsOptional()
  day: number;

  @IsInt()
  @IsOptional()
  weekdayNumber: number;

  @IsString()
  @IsOptional()
  weekdayName: string;

  @IsString()
  @IsOptional()
  monthNames: string;

  @IsEnum(ReserveHoursEnum)
  @IsOptional()
  hours: ReserveHoursEnum;

  @IsEnum(ReserveStateEnum)
  state: ReserveStateEnum;
}
