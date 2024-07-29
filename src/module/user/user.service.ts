import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  // async findOne(username: string): Promise<IUser | undefined> {
  //   return undefined;
  // }

  async createAdminWithSuperAdmin(userCreateDto: UserCreateDto) {
    try {
      const passwordHash = this.hashValue(userCreateDto.password);
      const result = await this.userRepository.insert({
        user_name: userCreateDto.user_name,
        password: passwordHash,
        mobile: userCreateDto.mobile,
      });
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
