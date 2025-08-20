// src/common/logger/logger.service.ts
import {
  Inject,
  Injectable,
  LoggerService as NestLoggerService,
} from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

import { LOGGER_KEY } from './logger.constants';

@Injectable()
export class LoggerService implements NestLoggerService {
  constructor(@Inject(LOGGER_KEY) private readonly logger: PinoLogger) {
    console.log('LoggerService initialized');
  }

  log(message: string, ...optionalParams: any[]) {
    this.logger.info({ params: optionalParams }, message);
  }

  error(message: string, trace?: string, ...optionalParams: any[]) {
    this.logger.error({ trace, params: optionalParams }, message);
  }

  warn(message: string, ...optionalParams: any[]) {
    this.logger.warn({ params: optionalParams }, message);
  }

  debug(message: string, ...optionalParams: any[]) {
    this.logger.debug({ params: optionalParams }, message);
  }

  verbose(message: string, ...optionalParams: any[]) {
    this.logger.trace({ params: optionalParams }, message);
  }
}
