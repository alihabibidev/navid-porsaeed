// dto/create-car-company.dto.ts
import { IsNotEmpty } from 'class-validator';

export class CreateCarCompanyDto {
  @IsNotEmpty()
  name: string;
}
