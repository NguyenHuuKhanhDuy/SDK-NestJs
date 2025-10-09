import { I18nModule } from '@core/services/i18n';
import { JwtTokenModule } from '@core/services/jwt';
import { LoggerModule } from '@core/services/logger';
import { RedisModule } from '@core/services/redis';
import { Module } from '@nestjs/common';

@Module({
  imports: [I18nModule, LoggerModule, JwtTokenModule, RedisModule],
  exports: [I18nModule, LoggerModule, JwtTokenModule, RedisModule],
})
export class CoreModule {}
