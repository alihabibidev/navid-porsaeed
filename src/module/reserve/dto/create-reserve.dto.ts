import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { ReserveHoursEnum } from '../reserve.enum';

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

export class CreateReserveDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  mobile: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsInt()
  companyId: number;

  @IsInt()
  typeId: number;

  @IsInt()
  modelId: number;

  @IsString()
  chassis_number: string;

  @IsString()
  company_name: string;

  @IsString()
  type_name: string;

  @IsString()
  model_name: string;

  @IsInt()
  allDaysPossibleId: number;

  @IsInt()
  year: number;

  @IsInt()
  month: number;

  @IsInt()
  day: number;

  @IsInt()
  weekdayNumber: number;

  @IsString()
  weekdayName: string;

  @IsString()
  monthNames: string;

  @IsEnum(ReserveHoursEnum)
  hours: ReserveHoursEnum;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  plaque: string;
}
