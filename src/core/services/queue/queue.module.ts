// queue.module.ts
import { Module } from '@nestjs/common';

import { NotificationQueueModule } from './notification/notification-queue.module';
import { QueueUnitOfWork } from './queue.unitofwork';
import { QueueCoreModule } from './queue-core.module';

@Module({
  imports: [QueueCoreModule, NotificationQueueModule],
  providers: [QueueUnitOfWork],
  exports: [QueueUnitOfWork],
})
export class QueueModule {}
