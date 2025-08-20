import { Department } from '@infrastructure/entities';
import { GenericRepository } from '@infrastructure/repositories/generic.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentRepository extends GenericRepository<Department> {
  constructor(
    @InjectRepository(Department)
    protected readonly repository: Repository<Department>,
  ) {
    super(repository);
  }
}
