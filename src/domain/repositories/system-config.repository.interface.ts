import { IGenericRepository } from '@domain/repositories/generic-repository.interface';
import { SystemConfig } from '@infrastructure/entities';

export interface ISystemConfigRepositoryInterface
  extends IGenericRepository<SystemConfig> {}
