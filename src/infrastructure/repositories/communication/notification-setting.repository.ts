import { INotificationSettingRepository } from '@domain/repositories';
import { NotificationSetting } from '@infrastructure/entities';
import { GenericRepository } from '@infrastructure/repositories/generic.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationSettingRepository
  extends GenericRepository<NotificationSetting>
  implements INotificationSettingRepository
{
  constructor(
    @InjectRepository(NotificationSetting)
    protected readonly repository: Repository<NotificationSetting>,
  ) {
    super(repository);
  }
}
