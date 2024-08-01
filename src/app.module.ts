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
import { RolesGuard } from './module/auth/guards/roles.guard';
import { CarModule } from './module/car/car.module';
import { AllDaysPossiblleModule } from './module/all-days-possiblle/all-days-possiblle.module';

@Module({
  imports: [
    ConfigureModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    JwtModule,
    CarModule,
    AllDaysPossiblleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
