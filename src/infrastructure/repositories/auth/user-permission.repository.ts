import { UserPermission } from '@infrastructure/entities';
import { GenericRepository } from '@infrastructure/repositories/generic.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserPermissionRepository extends GenericRepository<UserPermission> {
  constructor(
    @InjectRepository(UserPermission)
    protected readonly repository: Repository<UserPermission>,
  ) {
    super(repository);
  }
}
