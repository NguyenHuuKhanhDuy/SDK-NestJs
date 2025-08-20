import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NODE_ENV } from '@src/common/enum/common.enum';
import typeormConfig from '@src/configs/typeorm.config';
import * as Joi from 'joi';

import { ConfigEnvironmentService } from './config-environment.base.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid(...Object.values(NODE_ENV))
          .default(NODE_ENV.DEVELOP),
        PORT: Joi.number().port().default(4000),
      }),
      isGlobal: true,
      validationOptions: {
        abortEarly: true,
      },
      load: [typeormConfig],
    }),
  ],
  exports: [ConfigEnvironmentService],
  providers: [ConfigEnvironmentService],
})
export class ConfigEnvironmentModule {}
