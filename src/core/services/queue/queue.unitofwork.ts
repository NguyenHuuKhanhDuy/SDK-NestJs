import { Injectable } from '@nestjs/common';

import { NotificationQueueService } from './notification/notification-queue.service';

@Injectable()
export class QueueUnitOfWork {
  constructor(readonly notification: NotificationQueueService) {}
}
