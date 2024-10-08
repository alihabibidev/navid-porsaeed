import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserAdminController } from './user.admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserAdminController],
})
export class UserModule {}
