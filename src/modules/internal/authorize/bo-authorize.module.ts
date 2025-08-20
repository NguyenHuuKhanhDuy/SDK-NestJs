import { BoAuthorizeController } from '@internal/authorize/bo-authorize.controller';
import { Module } from '@nestjs/common';

import { commandsHandler } from './commands';
import { queryHandlers } from './queries';

@Module({
  imports: [],
  controllers: [BoAuthorizeController],
  providers: [...queryHandlers, ...commandsHandler],
  exports: [],
})
export class BoAuthorizeModule {}
