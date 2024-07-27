import { registerAs } from '@nestjs/config';
import { validateConfig } from '#src/core/config/validate-config';
import { IsInt, IsOptional } from 'class-validator';

export type DataBaseConfig = {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  ssl: boolean;
};

class EnvironmentVariablesValidator {
  @IsOptional()
  POSTGRES_HOST: string;

  @IsInt()
  @IsOptional()
  POSTGRES_PORT: number;

  @IsOptional()
  POSTGRES_DB: string;

  @IsOptional()
  POSTGRES_USER: string;

  @IsOptional()
  POSTGRES_PASSWORD: string;

  @IsOptional()
  DB_SSL: boolean;
}

export const databaseConfig = registerAs<DataBaseConfig>('database', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,

    database: process.env.POSTGRES_DB,

    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,

    ssl: process.env.DB_SSL === 'true',
  };
});
