import { type AppConfig } from './app.config';
import { AuthConfig } from './auth.config';
import { type DataBaseConfig } from './database.config';

export interface Config {
  app: AppConfig;
  database: DataBaseConfig;
  auth: AuthConfig;
}

export * from './app.config';
export * from './database.config';
export * from './auth.config';
