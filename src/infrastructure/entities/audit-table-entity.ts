import { Columns } from '@src/common/constant/entity.constant';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AuditTableEntity {
  @Column({ name: Columns.Base.CreatedBy, type: 'varchar', nullable: false })
  createdBy: string;

  @CreateDateColumn({
    name: Columns.Base.CreatedAt,
    type: 'timestamp with time zone',
    nullable: false,
  })
  createdAt: Date;

  @Column({ name: Columns.Base.UpdatedBy, type: 'varchar', nullable: true })
  updatedBy?: string;

  @UpdateDateColumn({
    name: Columns.Base.UpdatedAt,
    type: 'timestamp with time zone',
    nullable: true,
  })
  updatedAt?: Date;

  @DeleteDateColumn({
    name: Columns.Base.DeletedAt,
    type: 'timestamp with time zone',
    nullable: true,
  })
  deletedAt?: Date;

  @Column({ name: Columns.Base.DeletedBy, type: 'varchar', nullable: true })
  deletedBy?: string;
}
