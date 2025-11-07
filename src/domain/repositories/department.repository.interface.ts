import { IGenericRepository } from '@domain/repositories/generic-repository.interface';
import { Department } from '@infrastructure/entities';

export interface IDepartmentRepository extends IGenericRepository<Department> {}
