// dto/create-car-type.dto.ts
import { IsNotEmpty } from 'class-validator';

export class CreateCarTypeDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  companyId: number; // کلید خارجی (شرکت)
}
