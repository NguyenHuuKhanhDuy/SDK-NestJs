// notification-queue.module.ts
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { CommunicationModule } from '@src/core/services/communication/communication.module';

import { QueueConstant } from '../queue.constant';
import { NotificationQueueProcessor } from './notification-queue.processor';
import { NotificationQueueService } from './notification-queue.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QueueConstant.Notification.Name,
    }),
    CommunicationModule,
  ],
  providers: [NotificationQueueProcessor, NotificationQueueService],
  exports: [NotificationQueueService],
})
export class NotificationQueueModule {}
