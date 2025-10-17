import { AuditTableEntity } from '@infrastructure/entities/audit-table-entity';
import {
  Columns,
  Keys,
  Schemas,
  Tables,
} from '@src/common/constant/entity.constant';
import { Provider } from '@src/common/enum/provider';
import { UserStatus } from '@src/common/enum/user-status';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Department } from './department.entity';
import { UserPermission } from './user-permisstion.entity';
import { UserRole } from './user-role.entity';

@Entity({ name: Tables.User, schema: Schemas.Ecommerce })
export class User extends AuditTableEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: Columns.Base.ID,
    primaryKeyConstraintName: Keys.User.Primary,
  })
  id: string;

  @Column({ name: Columns.User.DepartmentId, type: 'bigint', unsigned: true })
  departmentId: number;

  @Column({
    name: Columns.User.FirstName,
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  firstName: string;

  @Column({
    name: Columns.User.LastName,
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  lastName: string;

  @Column({
    name: Columns.User.Username,
    unique: true,
    type: 'varchar',
    length: 15,
    nullable: false,
  })
  username: string;

  @Column({
    name: Columns.User.Email,
    unique: true,
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  email: string;

  @Column({ name: Columns.User.Password, type: 'varchar', nullable: false })
  password: string;

  @Column({ name: Columns.User.Status, type: 'int', nullable: false })
  status: UserStatus;

  @Column({
    name: Columns.User.IsSystemUser,
    type: 'bool',
    nullable: false,
    default: false,
  })
  isSystemUser: boolean;

  @Column({
    name: Columns.User.IsConfirmed,
    type: 'bool',
    nullable: false,
    default: false,
  })
  isConfirmed: boolean;

  @Column({ name: Columns.User.Provider, type: 'int', nullable: false })
  provider: Provider;

  @ManyToOne(() => Department, (department) => department.users, {
    nullable: true,
  })
  @JoinColumn({
    name: Columns.User.DepartmentId,
    foreignKeyConstraintName: Keys.User.ForeignKey.Department,
  })
  department: Department;

  @OneToMany(() => UserRole, (ur) => ur.user)
  roles: UserRole[];

  @OneToMany(() => UserPermission, (up) => up.user)
  permissions: UserPermission[];
}
