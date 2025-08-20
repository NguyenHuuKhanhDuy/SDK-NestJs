import { IGenericRepository } from '@domain/repositories/generic-repository.interface';
import { UserRole } from '@infrastructure/entities';

export interface IUserRoleRepository extends IGenericRepository<UserRole> {}
