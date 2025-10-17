import { LoggerModule } from '@core/services/logger';
import { Module } from '@nestjs/common';

import { MailService } from './mail.service';

@Module({
  imports: [LoggerModule],
  controllers: [],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
