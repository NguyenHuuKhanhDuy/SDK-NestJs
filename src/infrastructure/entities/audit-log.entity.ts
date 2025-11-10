import { Columns, Keys, Schemas, Tables } from '@common/constant';
import { AuditAction } from '@common/enum';
import { AuditTrackingDto } from '@common/models';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: Tables.AuditLog, schema: Schemas.BackOffice })
@Index(Keys.AuditLog.Index.composite, ['tableName', 'recordId', 'createdAt'])
export class AuditLog {
  @PrimaryGeneratedColumn('increment', {
    name: Columns.Base.ID,
    type: 'bigint',
    unsigned: true,
    primaryKeyConstraintName: Keys.AuditLog.Primary,
  })
  id: number;

  @Column({
    name: Columns.AuditLog.TableName,
    type: 'varchar',
    nullable: false,
  })
  tableName: string;

  @Column({ name: Columns.AuditLog.RecordId, type: 'varchar', nullable: true })
  recordId?: string;

  @Column({ name: Columns.AuditLog.Action, type: 'int', nullable: false })
  action: AuditAction;

  @Column({ name: Columns.AuditLog.Before, type: 'jsonb', nullable: true })
  before?: AuditTrackingDto[];

  @Column({ name: Columns.AuditLog.After, type: 'jsonb', nullable: true })
  after?: AuditTrackingDto[];

  @Column({ name: Columns.Base.CreatedBy, type: 'varchar', nullable: false })
  createdBy: string;

  @CreateDateColumn({
    name: Columns.Base.CreatedAt,
    type: 'timestamp with time zone',
    nullable: false,
  })
  createdAt: Date;
}
