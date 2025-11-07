import { IGenericRepository } from '@domain/repositories/generic-repository.interface';
import { RolePermission } from '@infrastructure/entities';

export interface IRolePermissionRepository
  extends IGenericRepository<RolePermission> {}
