import { ReserveHoursEnum } from '../reserve.enum';

export class CreateReserveDto {
  first_name: string;
  last_name: string;
  mobile: string;
  email: string;
  companyId: number;
  typeId: number;
  modelId: number;
  chassis_number: string;
  company_name: string;
  type_name: string;
  model_name: string;
  allDaysPossibleId: number;
  year: number;
  month: number;
  day: number;
  weekdayNumber: number;
  weekdayName: string;
  monthNames: string;
  hours: ReserveHoursEnum;
  description: string;
  plaque: string;
}
