import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { Roles } from '#src/common/decorators/roles.decorator';
import { Role } from '#src/common/constant/role.constant';
import { UserService } from './user.service';

@Controller('admin/user')
export class UserAdminController {
  constructor(private userService: UserService) {}

  @Get()
  @Roles(Role.SUPER_ADMIN)
  getAllAdmin() {
    return this.userService.getAllAdmin();
  }

  @Post('create')
  @Roles(Role.SUPER_ADMIN)
  createAdminWithSuperAdmin(@Body() userCreateDto: UserCreateDto) {
    return this.userService.createAdminWithSuperAdmin(userCreateDto);
  }

  @Delete('delete/:id')
  @Roles(Role.SUPER_ADMIN)
  deleteAdminWithSuperAdminById(@Param('id') adminUserId: number) {
    return this.userService.deleteAdminWithSuperAdminById(adminUserId);
  }
}
