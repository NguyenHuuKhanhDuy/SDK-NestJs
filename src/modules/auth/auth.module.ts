import { JwtTokenModule } from '@core/services/jwt';
import { QueueModule } from '@core/services/queue';
import { RedisModule } from '@core/services/redis';
import { AuthService } from '@modules/auth/auth.service';
import { Module } from '@nestjs/common';
import { IntegrationsModule } from '@src/integrations/integrations.module';
import { commandHandlers } from '@src/modules/auth/commands';

import { AuthController } from './auth.controller';

@Module({
  imports: [JwtTokenModule, RedisModule, QueueModule, IntegrationsModule],
  providers: [...commandHandlers, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
