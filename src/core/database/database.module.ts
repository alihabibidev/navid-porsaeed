import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Config } from '#src/core/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENV } from '#src/common/constant';

@Module({
  imports: [
    //Typeorm postgres module configs
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<Config>) => ({
        type: 'postgres',
        host: config.getOrThrow('database.host', { infer: true }),
        port: config.getOrThrow('database.port', { infer: true }),
        database: config.getOrThrow('database.database', { infer: true }),
        username: config.getOrThrow('database.username', { infer: true }),
        password: config.getOrThrow('database.password', { infer: true }),
        // migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        ssl: config.get('database.ssl', { infer: true }) && {
          rejectUnauthorized: false,
        },
        synchronize: true,
        autoLoadEntities: true,
        // logging: config.get("app.env", { infer: true }) !== ENV.TEST,
      }),
    }),
  ],
})
export class DatabaseModule implements OnModuleInit {
  private readonly logger = new Logger(DatabaseModule.name);
  constructor(private readonly configService: ConfigService<Config>) {}

  onModuleInit() {
    const port = this.configService.getOrThrow('database.port', {
      infer: true,
    });
    this.logger.log(`Connected to the database on port: ${port}`);
  }
}
