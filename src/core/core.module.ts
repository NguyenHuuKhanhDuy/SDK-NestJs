import { I18nModule } from '@core/services/i18n';
import { JwtTokenModule } from '@core/services/jwt';
import { LoggerModule } from '@core/services/logger';
import { Module } from '@nestjs/common';

@Module({
  imports: [I18nModule, LoggerModule, JwtTokenModule],
  exports: [I18nModule, LoggerModule, JwtTokenModule],
})
export class CoreModule {}
