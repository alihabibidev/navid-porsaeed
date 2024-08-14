import { HttpException, Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { genSaltSync, hashSync } from 'bcrypt';
import { Role } from '#src/common/constant/role.constant';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  // async findOne(username: string): Promise<IUser | undefined> {
  //   return undefined;
  // }

  async getAllAdmin() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createAdminWithSuperAdmin(userCreateDto: UserCreateDto) {
    try {
      if (userCreateDto.role === Role.SUPER_ADMIN) {
        throw new HttpException(
          'You do not have permission to create super admin',
          403,
        );
      }
      const passwordHash = this.hashValue(userCreateDto.password);
      const result = await this.userRepository.insert({
        first_name: userCreateDto.first_name,
        last_name: userCreateDto.last_name,
        user_name: userCreateDto.user_name,
        password: passwordHash,
        mobile: userCreateDto.mobile,
        role: userCreateDto.role,
      });
      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      if (error instanceof QueryFailedError) {
        if ((error as any).code === '23505') {
          console.log(
            `Unique constraint ${(error as any).constraint} failed aliiiiiii`,
          );
          throw new HttpException('Unique constraint', 400);
        }
      }
      throw error;
    }
  }

  async deleteAdminWithSuperAdminById(id: number) {
    try {
      const result = await this.userRepository.delete(id);
      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  hashValue(value: string) {
    const salt = genSaltSync(10);
    return hashSync(value, salt);
  }
}
