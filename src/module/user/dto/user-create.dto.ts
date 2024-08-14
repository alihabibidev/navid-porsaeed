import { Role } from '#src/common/constant/role.constant';
import { IsEnum, IsString } from 'class-validator';

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

  @IsEnum(Role)
  role: Role;
}
