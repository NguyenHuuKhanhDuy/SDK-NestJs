import { IGenericRepository } from '@domain/repositories/generic-repository.interface';
import { Permission } from '@infrastructure/entities';

export interface IPermissionRepository extends IGenericRepository<Permission> {}
