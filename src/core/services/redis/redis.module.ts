import { EnvKey } from '@common/constant';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule as IoRedisModule } from '@nestjs-modules/ioredis';

import { BaseRedisService } from './base-redis.service';
import { RedisService } from './redis.service';

@Module({
  imports: [
    ConfigModule,
    IoRedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'single',
        options: {
          host: config.get(EnvKey.Redis.Host),
          port: config.get<number>(EnvKey.Redis.Port),
          password: config.get(EnvKey.Redis.Password) || undefined,
        },
      }),
    }),
  ],
  providers: [BaseRedisService, RedisService],
  exports: [BaseRedisService, RedisService],
})
export class RedisModule {}
