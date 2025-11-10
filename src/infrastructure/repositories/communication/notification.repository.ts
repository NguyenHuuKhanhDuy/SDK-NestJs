import { INotificationRepository } from '@domain/repositories';
import { Notification } from '@infrastructure/entities';
import { GenericRepository } from '@infrastructure/repositories/generic.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationRepository
  extends GenericRepository<Notification>
  implements INotificationRepository
{
  constructor(
    @InjectRepository(Notification)
    protected readonly repository: Repository<Notification>,
  ) {
    super(repository);
  }
}
