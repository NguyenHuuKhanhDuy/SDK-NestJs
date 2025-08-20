import { RolePermission } from '@infrastructure/entities';
import { GenericRepository } from '@infrastructure/repositories/generic.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolePermissionRepository extends GenericRepository<RolePermission> {
  constructor(
    @InjectRepository(RolePermission)
    protected readonly repository: Repository<RolePermission>,
  ) {
    super(repository);
  }
}
