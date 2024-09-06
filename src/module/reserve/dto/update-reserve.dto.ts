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

  @IsEnum(ReserveStateEnum)
  state: ReserveStateEnum;
}
