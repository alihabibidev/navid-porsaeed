import { IsString } from 'class-validator';

export class UserCreateDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  user_name: string;

  @IsString()
  password: string;

  @IsString()
  mobile: string;
}
