import { SendNotificationDto } from '@core/services/communication';
import CommunicationService from '@core/services/communication/communication.service';
import { LoggerService } from '@core/services/logger';
import { QueueConstant } from '@core/services/queue/queue.constant';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor(QueueConstant.Notification.Name)
export class NotificationQueueProcessor {
  constructor(
    private readonly logger: LoggerService,
    private readonly communication: CommunicationService,
  ) {}

  @Process(QueueConstant.Notification.Jobs.SendNotification)
  async handleSendEmail(job: Job<SendNotificationDto>) {
    await this.communication.send(job.data);
  }
}
