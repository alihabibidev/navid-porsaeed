import { registerAs } from '@nestjs/config';
import { validateConfig } from '#src/core/config/validate-config';
import { IsOptional, IsString } from 'class-validator';

export type ReserveConfig = {
  r_capacity_at_8: number;
  r_capacity_at_9: number;
  r_capacity_at_10: number;
  r_capacity_at_11: number;
};

class EnvironmentVariablesValidator {
  @IsString()
  @IsOptional()
  R_CAPACITY_AT_8 = 4;

  @IsString()
  @IsOptional()
  R_CAPACITY_AT_9 = 4;

  @IsString()
  @IsOptional()
  R_CAPACITY_AT_10 = 4;

  @IsString()
  @IsOptional()
  R_CAPACITY_AT_11 = 4;
}

export const reserveConfig = registerAs<ReserveConfig>('reserve', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);
  return {
    r_capacity_at_8: +process.env.R_CAPACITY_AT_8,

    r_capacity_at_9: +process.env.R_CAPACITY_AT_9,

    r_capacity_at_10: +process.env.R_CAPACITY_AT_10,

    r_capacity_at_11: +process.env.R_CAPACITY_AT_11,
  };
});
