import { AuditTableEntity } from '@infrastructure/entities/audit-table-entity';
import {
  Columns,
  Keys,
  Schemas,
  Tables,
} from '@src/common/constant/entity.constant';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Permission } from './permission.entity';

@Entity({ name: Tables.Menu, schema: Schemas.BackOffice })
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

  @Column({ name: Columns.Menu.ParentId, type: 'varchar', nullable: true })
  parentId?: string | null;

  @Column({ name: Columns.Menu.OrderNo, type: 'int', nullable: false })
  orderNo: number;

  @Column({
    name: Columns.Menu.IsActive,
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isActive: boolean;

  @Column({
    name: Columns.Menu.Link,
    type: 'varchar',
    nullable: true,
    length: 256,
  })
  link: string;

  @ManyToOne(() => Menu, (m) => m.children, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: Columns.Menu.ParentId,
    foreignKeyConstraintName: Keys.Menu.ForeignKey.Parent,
  })
  parent?: Menu | null;

  @OneToMany(() => Menu, (m) => m.parent)
  children?: Menu[];

  @OneToMany(() => Permission, (permission) => permission.menu)
  permissions: Permission[];
}
