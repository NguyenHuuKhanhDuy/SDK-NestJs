import { Permission } from '@infrastructure/entities';
import { GenericRepository } from '@infrastructure/repositories/generic.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionRepository extends GenericRepository<Permission> {
  constructor(
    @InjectRepository(Permission)
    protected readonly repository: Repository<Permission>,
  ) {
    super(repository);
  }
}
