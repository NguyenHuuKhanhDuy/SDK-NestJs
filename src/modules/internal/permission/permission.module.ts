import { Module } from '@nestjs/common';

import { PermissionController } from './permission.controller';
import { queryHandlers } from './queries';

@Module({
  imports: [],
  controllers: [PermissionController],
  providers: [...queryHandlers],
  exports: [],
})
export class PermissionModule {}
