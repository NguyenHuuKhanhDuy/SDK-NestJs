import { IGenericRepository } from '@domain/repositories/generic-repository.interface';
import { Menu } from '@infrastructure/entities';

export interface IMenuRepository extends IGenericRepository<Menu> {}
