import { Columns, Keys, Schemas, Tables } from '@common/constant';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: Tables.SystemConfig, schema: Schemas.BackOffice })
export class SystemConfig {
  @PrimaryGeneratedColumn('uuid', {
    name: Columns.Base.ID,
    primaryKeyConstraintName: Keys.SystemConfig.Primary,
  })
  id: string;

  @Column({ name: Columns.SystemConfig.Key, unique: true })
  key: string;

  @Column({ name: Columns.SystemConfig.Value, type: 'jsonb' })
  value: string;

  @Column({ name: Columns.SystemConfig.IsActive, default: true })
  isActive: boolean;

  @CreateDateColumn({
    name: Columns.Base.CreatedAt,
    type: 'timestamp with time zone',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: Columns.Base.UpdatedAt,
    type: 'timestamp with time zone',
    nullable: true,
  })
  updatedAt?: Date;
}
