import { ISystemConfigRepository } from '@domain/repositories';
import { SystemConfig } from '@infrastructure/entities';
import { GenericRepository } from '@infrastructure/repositories/generic.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SystemConfigRepository
  extends GenericRepository<SystemConfig>
  implements ISystemConfigRepository
{
  constructor(
    @InjectRepository(SystemConfig)
    protected readonly repository: Repository<SystemConfig>,
  ) {
    super(repository);
  }
}
