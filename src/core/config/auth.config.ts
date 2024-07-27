import { registerAs } from '@nestjs/config';
import { validateConfig } from '#src/core/config/validate-config';
import { IsOptional } from 'class-validator';

export type AuthConfig = {
  jwtAccessTokenSecret: string;
  jwtRefreshhTokenSecret: string;
};

class EnvironmentVariablesValidator {
  @IsOptional()
  JWT_ACCESS_TOKEN_SECRET: string;

  @IsOptional()
  JWT_REFRESH_TOKEN_SECRET: string;
}

export const authConfig = registerAs<AuthConfig>('auth', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    jwtAccessTokenSecret:
      process.env.JWT_ACCESS_TOKEN_SECRET || 'dsdgsdgsdgsd@34324faolan',
    jwtRefreshhTokenSecret:
      process.env.JWT_REFRESH_TOKEN_SECRET || 'dfmsnfbjehekjsd8@%43tge',
  };
});
