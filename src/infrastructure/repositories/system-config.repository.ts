import { SystemConfig } from '@infrastructure/entities';
import { GenericRepository } from '@infrastructure/repositories/generic.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SystemConfigRepository extends GenericRepository<SystemConfig> {
  constructor(
    @InjectRepository(SystemConfig)
    protected readonly repository: Repository<SystemConfig>,
  ) {
    super(repository);
  }
}
