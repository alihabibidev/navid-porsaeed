import { Module } from '@nestjs/common';
import * as configs from '#src/core/config';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: Object.values(configs),
    }),
  ],
})
export class ConfigureModule {}
