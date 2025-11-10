import { IAuditLogRepository } from '@domain/repositories';
import { AuditLog } from '@infrastructure/entities';
import { GenericRepository } from '@infrastructure/repositories/generic.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuditLogRepository
  extends GenericRepository<AuditLog>
  implements IAuditLogRepository
{
  constructor(
    @InjectRepository(AuditLog)
    protected readonly repository: Repository<AuditLog>,
  ) {
    super(repository);
  }
}
