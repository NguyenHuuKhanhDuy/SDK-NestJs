import { JwtTokenModule } from '@core/services/jwt';
import { QueueModule } from '@core/services/queue';
import { Module } from '@nestjs/common';
import { IntegrationsModule } from '@src/integrations/integrations.module';

import { commandHandlers } from './commands';
import { queryHandlers } from './queries';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [IntegrationsModule, JwtTokenModule, QueueModule],
  controllers: [UserController],
  providers: [...queryHandlers, ...commandHandlers, UserService],
  exports: [],
})
export class UserModule {}
