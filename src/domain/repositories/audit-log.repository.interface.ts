import { IGenericRepository } from '@domain/repositories/generic-repository.interface';
import { AuditLog } from '@infrastructure/entities';

export interface IAuditLogRepository extends IGenericRepository<AuditLog> {}
