import { IsString } from 'class-validator';

export class UserCreateDto {
  @IsString()
  user_name: string;

  @IsString()
  password: string;

  @IsString()
  mobile: string;
}
