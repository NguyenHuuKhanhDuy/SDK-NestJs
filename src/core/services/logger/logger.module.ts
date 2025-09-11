// src/common/logger/logger.module.ts
import { Global, Module } from '@nestjs/common';
import { ConfigEnvironmentService } from '@src/configs/config-environment.base.service';
import { LoggerModule as PinoLoggerModule, PinoLogger } from 'nestjs-pino';
import pino from 'pino';

import { LOGGER_KEY } from './logger.constants';
import { LoggerService } from './logger.service';

const isProd = ConfigEnvironmentService.isProduction();

@Global()
@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        customProps: () => ({}),
        level: ConfigEnvironmentService.getIns().get('LOG_LEVEL') || 'debug',

        ...(isProd
          ? {
              timestamp: pino.stdTimeFunctions.isoTime,
            }
          : {
              transport: {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  translateTime: 'yyyy-mm-dd HH:MM:ss.l o',
                  ignore: 'pid,hostname,req,res,context,responseTime',
                },
              },
            }),
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
