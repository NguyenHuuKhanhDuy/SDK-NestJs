import { EnvKey } from '@common/constant';
import { Module } from '@nestjs/common';
import { RedisModule as IoRedisModule } from '@nestjs-modules/ioredis';
import { ConfigEnvironmentService } from '@src/configs';

import { BaseRedisService } from './base-redis.service';
import { RedisService } from './redis.service';

@Module({
  imports: [
    IoRedisModule.forRootAsync({
      useFactory: () => ({
        type: 'single',
        options: {
          host: ConfigEnvironmentService.getIns().get(EnvKey.Redis.Host),
          port: ConfigEnvironmentService.getIns().get<number>(
            EnvKey.Redis.Port,
          ),
          password:
            ConfigEnvironmentService.getIns().get(EnvKey.Redis.Password) ||
            undefined,
        },
      }),
    }),
  ],
  providers: [BaseRedisService, RedisService],
  exports: [BaseRedisService, RedisService],
})
export class RedisModule {}
