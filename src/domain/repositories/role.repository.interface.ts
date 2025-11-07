import { IGenericRepository } from '@domain/repositories/generic-repository.interface';
import { Role } from '@infrastructure/entities';

export interface IRoleRepository extends IGenericRepository<Role> {}
