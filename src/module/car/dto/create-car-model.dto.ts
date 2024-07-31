// dto/create-car-model.dto.ts
import { IsNotEmpty } from 'class-validator';

export class CreateCarModelDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  typeId: number; // کلید خارجی (نوع)
}
