import 'dotenv/config';

import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',

  host: configService.get('POSTGRES_HOST'),
  port: +configService.get('POSTGRES_PORT'),

  database: configService.get('POSTGRES_DB'),

  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),

  ssl: configService.get('DB_SSL') === 'true' && { rejectUnauthorized: false },

  entities: ['src/**/*.entity.ts'],
  migrations: ['src/modules/database/migrations/*.ts'],
});
