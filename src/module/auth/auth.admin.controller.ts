import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/basic.dto';
import { GetCurrentUserId, Public } from '#src/common/decorators';
import { responseDto } from '#src/common/dto/response.dto';
import { RefreshJwtGuard } from './guards/refresh-token.guard';
// import { responseDto } from '#src/common/dto/response.dto';
@Controller('admin/auth')
export class AuthAdminController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  logout(@GetCurrentUserId() userId: number): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  refreshTokens(
    @Body('refreshToken') refreshToken: string,
    @GetCurrentUserId() userId: number,
  ): Promise<responseDto<object>> {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Public()
  @Get('hash/:value')
  hashGenerator(@Param('value') value: string) {
    return this.authService.hashValue(value);
  }
}
