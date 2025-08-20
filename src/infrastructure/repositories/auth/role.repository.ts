import { Role } from '@infrastructure/entities';
import { GenericRepository } from '@infrastructure/repositories/generic.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleRepository extends GenericRepository<Role> {
  constructor(
    @InjectRepository(Role)
    protected readonly repository: Repository<Role>,
  ) {
    super(repository);
  }
}
