import { Columns, Keys, Schemas, Tables } from '@common/constant';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: Tables.SystemConfig, schema: Schemas.Ecommerce })
export class SystemConfig {
  @PrimaryGeneratedColumn('uuid', {
    name: Columns.Base.ID,
    primaryKeyConstraintName: Keys.SystemConfig.Primary,
  })
  id: string;

  @Column({ name: Columns.SystemConfig.Key, unique: true })
  key: string;

  @Column({ name: Columns.SystemConfig.Value, type: 'jsonb' })
  value: Record<string, any>;

  @Column({ name: Columns.SystemConfig.IsActive, default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
