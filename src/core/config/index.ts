import { type AppConfig } from './app.config';
import { AuthConfig } from './auth.config';
import { type DataBaseConfig } from './database.config';
import { ReserveConfig } from './reserve.config';

export interface Config {
  app: AppConfig;
  database: DataBaseConfig;
  auth: AuthConfig;
  reserve: ReserveConfig;
}

export * from './app.config';
export * from './database.config';
export * from './auth.config';
export * from './reserve.config';
