import {
  Columns,
  Keys,
  Schemas,
  Tables,
} from '@src/common/constant/entity.constant';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Permission } from './permission.entity';
import { User } from './user.entity';

@Entity({ name: Tables.UserPermission, schema: Schemas.BackOffice })
export class UserPermission {
  @PrimaryColumn({ name: Columns.UserPermission.UserId })
  userId: string;

  @PrimaryColumn({ name: Columns.UserPermission.PermissionId })
  permissionId: string;

  @ManyToOne(() => User, (user) => user.permissions, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: Columns.UserPermission.UserId,
    foreignKeyConstraintName: Keys.UserPermission.ForeignKey.User,
  })
  user: User;

  @ManyToOne(() => Permission, (permission) => permission.users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: Columns.UserPermission.PermissionId,
    foreignKeyConstraintName: Keys.UserPermission.ForeignKey.Permission,
  })
  permission: Permission;
}
