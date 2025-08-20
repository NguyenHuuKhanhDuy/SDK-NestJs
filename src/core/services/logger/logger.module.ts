// src/common/logger/logger.module.ts
import { Global, Module } from '@nestjs/common';
import { ConfigEnvironmentService } from '@src/configs/config-environment.base.service';
import { LoggerModule as PinoLoggerModule, PinoLogger } from 'nestjs-pino';

import { LOGGER_KEY } from './logger.constants';
import { LoggerService } from './logger.service';

@Global()
@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        customProps: () => ({}),
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'yyyy-mm-dd HH:MM:ss',
            ignore: 'pid,hostname,req,res,context,responseTime',
          },
        },
        level: ConfigEnvironmentService.getIns().get('LOG_LEVEL') || 'debug',
      },
    }),
  ],
  providers: [
    {
      provide: LOGGER_KEY,
      useClass: PinoLogger,
    },
    LoggerService,
  ],
  exports: [LoggerService],
})
export class LoggerModule {}
