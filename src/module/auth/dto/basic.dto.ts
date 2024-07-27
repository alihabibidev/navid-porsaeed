import { IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  user_name: string;
  @IsString()
  @Length(6, 20, { message: 'your password is incorrect' })
  password: string;
}
