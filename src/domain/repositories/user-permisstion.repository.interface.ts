import { IGenericRepository } from '@domain/repositories/generic-repository.interface';
import { UserPermission } from '@infrastructure/entities';

export interface IUserPermissionRepository
  extends IGenericRepository<UserPermission> {}
