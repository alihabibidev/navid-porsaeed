import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigureModule } from './core/config/configure.module';
import { DatabaseModule } from './core/database';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './module/auth/guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ConfigureModule, DatabaseModule, AuthModule, UserModule, JwtModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
