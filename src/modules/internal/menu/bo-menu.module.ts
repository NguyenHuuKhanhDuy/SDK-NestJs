import { Module } from '@nestjs/common';

import { BoMenuController } from './bo-menu.controller';
import { queryHandlers } from './queries';

@Module({
  controllers: [BoMenuController],
  providers: [...queryHandlers],
})
export class BoMenuModule {}
