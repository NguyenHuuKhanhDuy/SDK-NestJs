import { IGenericRepository } from '@domain/repositories/generic-repository.interface';
import { User } from '@infrastructure/entities';

export interface IUserRepository extends IGenericRepository<User> {}
