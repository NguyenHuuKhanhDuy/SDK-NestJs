import { PermissionType } from '@common/enum';
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

import { Menu } from './menu.entity';
import { RolePermission } from './role-permission.entity';
import { UserPermission } from './user-permisstion.entity';

@Entity({ name: Tables.Permission, schema: Schemas.BackOffice })
export class Permission extends AuditTableEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: Columns.Base.ID,
    primaryKeyConstraintName: Keys.Permission.Primary,
  })
  id: string;

  @Column({ name: Columns.Permission.MenuId, type: 'uuid' })
  menuId: string;

  @Column({
    name: Columns.Permission.Name,
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  name: string;

  @Column({
    name: Columns.Permission.Description,
    type: 'varchar',
    length: 512,
    nullable: true,
  })
  description: string;

  @Column({
    name: Columns.Permission.Key,
    unique: true,
    type: 'varchar',
    length: 256,
  })
  key: string;

  @Column({ name: Columns.Permission.Type, type: 'int', nullable: false })
  type: PermissionType;

  @Column({ name: Columns.Permission.OrderNo, type: 'int', nullable: false })
  orderNo: number;

  @OneToMany(() => UserPermission, (up) => up.permission)
  users: UserPermission[];

  @OneToMany(() => RolePermission, (rp) => rp.permission)
  roles: RolePermission[];

  @ManyToOne(() => Menu, (menu) => menu.permissions)
  @JoinColumn({
    name: Columns.Permission.MenuId,
    foreignKeyConstraintName: Keys.Permission.ForeignKey.Menu,
  })
  menu: Menu;
}
