import { SendNotificationDto } from '@core/services/communication';
import { QueueConstant } from '@core/services/queue/queue.constant';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class NotificationQueueService {
  constructor(
    @InjectQueue(QueueConstant.Notification.Name) private readonly queue: Queue,
  ) {}

  async sendNotification(sendNotificationDto: SendNotificationDto) {
    await this.queue.add(
      QueueConstant.Notification.Jobs.SendNotification,
      sendNotificationDto,
    );
  }
}
