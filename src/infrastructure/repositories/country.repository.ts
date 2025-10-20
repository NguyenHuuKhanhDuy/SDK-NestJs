import { Country } from '@infrastructure/entities';
import { GenericRepository } from '@infrastructure/repositories/generic.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CountryRepository extends GenericRepository<Country> {
  constructor(
    @InjectRepository(Country)
    protected readonly repository: Repository<Country>,
  ) {
    super(repository);
  }
}
