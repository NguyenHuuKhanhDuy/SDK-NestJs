import { RedisModule } from '@core/services/redis';
import { Module } from '@nestjs/common';
import { IntegrationsModule } from '@src/integrations/integrations.module';

import { commandHandlers } from './commands';
import { queryHandlers } from './queris';
import { UserController } from './user.controller';

@Module({
  imports: [IntegrationsModule, RedisModule],
  providers: [...queryHandlers, ...commandHandlers],
  controllers: [UserController],
})
export class UserModule {}
