import { AuditTableEntity } from '@infrastructure/entities/audit-table-entity';
import {
  Columns,
  Keys,
  Schemas,
  Tables,
} from '@src/common/constant/entity.constant';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Permission } from './permission.entity';

@Entity({ name: Tables.Menu, schema: Schemas.Ecommerce })
export class Menu extends AuditTableEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: Columns.Base.ID,
    primaryKeyConstraintName: Keys.Menu.Primary,
  })
  id: string;

  @Column({
    name: Columns.Menu.Name,
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  name: string;

  @Column({
    name: Columns.Menu.Key,
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  key: string;

  @Column({
    name: Columns.Menu.Description,
    type: 'varchar',
    length: 512,
    nullable: true,
  })
  description: string;

  @OneToMany(() => Permission, (permission) => permission.menu)
  permissions: Permission[];
}
