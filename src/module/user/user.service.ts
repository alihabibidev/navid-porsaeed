import { Injectable } from '@nestjs/common';
import { IUser } from './user.interface';

@Injectable()
export class UserService {
  async findOne(username: string): Promise<IUser | undefined> {
    return undefined;
  }
}
