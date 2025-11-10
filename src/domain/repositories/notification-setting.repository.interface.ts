import { IGenericRepository } from '@domain/repositories/generic-repository.interface';
import { NotificationSetting } from '@infrastructure/entities';

export interface INotificationSettingRepository
  extends IGenericRepository<NotificationSetting> {}
