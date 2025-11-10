import { I18nModule } from '@core/services/i18n';
import { JwtTokenModule } from '@core/services/jwt';
import { LoggerModule } from '@core/services/logger';
import { QueueModule } from '@core/services/queue';
import { RateLimitModule } from '@core/services/rate-limit';
import { RedisModule } from '@core/services/redis';
import { SocketModule } from '@core/services/socket';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    I18nModule,
    LoggerModule,
    JwtTokenModule,
    RedisModule,
    QueueModule,
    SocketModule,
    RateLimitModule,
  ],
  exports: [
    I18nModule,
    LoggerModule,
    JwtTokenModule,
    RedisModule,
    QueueModule,
    SocketModule,
    RateLimitModule,
  ],
})
export class CoreModule {}
