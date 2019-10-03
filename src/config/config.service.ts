import * as fs from 'fs';
import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    // this.envConfig = this.validateInput(config);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  // private validateInput(envConfig: EnvConfig): EnvConfig {
  //   const envVarsSchema: Joi.ObjectSchema = Joi.object({
  //     NODE_ENV: Joi.string()
  //       .valid('development', 'production', 'test', 'provision')
  //       .default('development'),
  //     APP_NAME: Joi.string(),
  //     APP_PORT: Joi.number().default(3000),
  //   });

  //   const { error, value: validatedEnvConfig } = envVarsSchema.validate(
  //     envConfig,
  //   );
  //   if (error) {
  //     throw new Error(`Config validation error: ${error.message}`);
  //   }
  //   return validatedEnvConfig;
  // }

  getString(key: string): string {
    return this.envConfig[key];
  }
}
