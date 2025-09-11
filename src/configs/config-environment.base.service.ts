import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_CONFIG } from '@src/app.config';
import { isNil } from 'lodash';

@Injectable()
export class ConfigEnvironmentService {
  private static configService: ConfigService;
  constructor(configService: ConfigService) {
    ConfigEnvironmentService.configService = configService;
  }

  static get(key: string) {
    if (ConfigEnvironmentService.isEnvKeySatisfied(key)) {
      return ConfigEnvironmentService.configService.get<string>(key);
    }
    return null;
  }

  get(key: string) {
    if (ConfigEnvironmentService.isEnvKeySatisfied(key)) {
      return ConfigEnvironmentService.configService.get<string>(key);
    }
    return null;
  }

  // Check env key exists in system
  static isEnvKeySatisfied(key: string) {
    return Object.keys(APP_CONFIG).includes(key);
  }

  // Check env key exists in system
  static isEnvValuesIsNil(key: string) {
    return isNil(APP_CONFIG[key]);
  }

  public static getIns() {
    if (!ConfigEnvironmentService.configService) {
      ConfigEnvironmentService.configService = new ConfigService();
    }

    return ConfigEnvironmentService.configService;
  }

  static isProduction() {
    return this.getIns().get('NODE_ENV') === 'production';
  }
}
