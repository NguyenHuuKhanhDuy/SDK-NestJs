import { IGenericRepository } from '@domain/repositories/generic-repository.interface';
import { NotificationTemplate } from '@infrastructure/entities';

export interface INotificationTemplateRepository
  extends IGenericRepository<NotificationTemplate> {}
