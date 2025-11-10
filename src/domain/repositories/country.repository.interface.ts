import { IGenericRepository } from '@domain/repositories/generic-repository.interface';
import { Country } from '@infrastructure/entities';

export interface ICountryRepository extends IGenericRepository<Country> {}
