import { Module } from '@nestjs/common';

import { commandHandlers } from './commands';
import { queryHandlers } from './queries';
import { RoleController } from './role.controller';

@Module({
  imports: [],
  controllers: [RoleController],
  providers: [...queryHandlers, ...commandHandlers],
  exports: [],
})
export class RoleModule {}
