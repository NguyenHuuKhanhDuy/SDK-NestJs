import { JwtTokenModule } from '@core/services/jwt';
import { LoggerModule } from '@core/services/logger';
import { RedisModule } from '@core/services/redis';
import { Module } from '@nestjs/common';

import { SocketGateway } from './socket.gateway';
import { SocketService } from './socket.service';

@Module({
  imports: [JwtTokenModule, RedisModule, LoggerModule],
  providers: [SocketGateway, SocketService],
  exports: [SocketService],
})
export class SocketModule {}
