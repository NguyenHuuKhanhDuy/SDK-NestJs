import { MailModule } from '@core/services/mail';
import { RedisModule } from '@core/services/redis';
import { SocketModule } from '@core/services/socket';
import { Module } from '@nestjs/common';

import CommunicationService from './communication.service';

@Module({
  imports: [MailModule, RedisModule, SocketModule],
  controllers: [],
  providers: [CommunicationService],
  exports: [CommunicationService],
})
export class CommunicationModule {}
