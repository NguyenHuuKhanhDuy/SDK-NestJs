import { IGenericRepository } from '@domain/repositories/generic-repository.interface';
import { SystemConfig } from '@infrastructure/entities';

export interface ISystemConfigRepository
  extends IGenericRepository<SystemConfig> {}
