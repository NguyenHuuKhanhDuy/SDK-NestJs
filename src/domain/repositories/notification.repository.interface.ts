import { IGenericRepository } from '@domain/repositories/generic-repository.interface';
import { Notification } from '@infrastructure/entities';

export interface INotificationRepository
  extends IGenericRepository<Notification> {}
