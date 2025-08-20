import {
  Columns,
  Keys,
  Schemas,
  Tables,
} from '@src/common/constant/entity.constant';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Permission } from './permission.entity';
import { Role } from './role.entity';

@Entity({ name: Tables.RolePermission, schema: Schemas.Ecommerce })
export class RolePermission {
  @PrimaryColumn({ name: Columns.RolePermission.RoleId, type: 'uuid' })
  roleId: number;

  @PrimaryColumn({ name: Columns.RolePermission.PermissionId, type: 'uuid' })
  permissionId: string;

  @ManyToOne(() => Role, (role) => role.permissions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: Columns.RolePermission.RoleId,
    foreignKeyConstraintName: Keys.RolePermission.ForeignKey.Role,
  })
  role: Role;

  @ManyToOne(() => Permission, (permission) => permission.roles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: Columns.RolePermission.PermissionId,
    foreignKeyConstraintName: Keys.RolePermission.ForeignKey.Permission,
  })
  permission: Permission;
}
