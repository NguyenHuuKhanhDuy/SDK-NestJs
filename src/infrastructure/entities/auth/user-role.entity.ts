import {
  Columns,
  Keys,
  Schemas,
  Tables,
} from '@src/common/constant/entity.constant';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Role } from './role.entity';
import { User } from './user.entity';

@Entity({ name: Tables.UserRole, schema: Schemas.Ecommerce })
export class UserRole {
  @PrimaryColumn({ name: Columns.UserRole.UserId })
  userId: string;

  @PrimaryColumn({ name: Columns.UserRole.RoleId })
  roleId: string;

  @ManyToOne(() => User, (user) => user.roles, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: Columns.UserRole.UserId,
    foreignKeyConstraintName: Keys.UserRole.ForeignKey.User,
  })
  user: User;

  @ManyToOne(() => Role, (role) => role.users, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: Columns.UserRole.RoleId,
    foreignKeyConstraintName: Keys.UserRole.ForeignKey.Role,
  })
  role: Role;
}
