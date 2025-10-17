import { JwtTokenModule } from '@core/services/jwt';
import { QueueModule } from '@core/services/queue';
import { RedisModule } from '@core/services/redis';
import { Module } from '@nestjs/common';
import { commandHandlers } from '@src/modules/auth/commands';

import { AuthController } from './auth.controller';

@Module({
  imports: [JwtTokenModule, RedisModule, QueueModule],
  providers: [...commandHandlers],
  controllers: [AuthController],
})
export class AuthModule {}
