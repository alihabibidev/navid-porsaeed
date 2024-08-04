// dto/create-car-type.dto.ts
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCarTypeDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  companyId: number; // کلید خارجی (شرکت)
}
