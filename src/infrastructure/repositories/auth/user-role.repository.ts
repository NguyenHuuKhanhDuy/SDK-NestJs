import { UserRole } from '@infrastructure/entities';
import { GenericRepository } from '@infrastructure/repositories/generic.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRoleRepository extends GenericRepository<UserRole> {
  constructor(
    @InjectRepository(UserRole)
    protected readonly repository: Repository<UserRole>,
  ) {
    super(repository);
  }
}
