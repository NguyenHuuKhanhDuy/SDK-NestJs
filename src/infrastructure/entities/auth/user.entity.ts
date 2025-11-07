import { AuditTableEntity } from '@infrastructure/entities/audit-table-entity';
import { Country } from '@infrastructure/entities/country.entity';
import {
  Columns,
  Keys,
  Schemas,
  Tables,
} from '@src/common/constant/entity.constant';
import { Provider } from '@src/common/enum/provider';
import { UserStatus } from '@src/common/enum/user-status';
import { Notification } from '@src/infrastructure/entities/communication/notification.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Department } from './department.entity';
import { Role } from './role.entity';
import { UserPermission } from './user-permisstion.entity';

@Entity({ name: Tables.User, schema: Schemas.Ecommerce })
export class User extends AuditTableEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: Columns.Base.ID,
    primaryKeyConstraintName: Keys.User.Primary,
  })
  id: string;

  @Column({
    name: Columns.User.DepartmentId,
    type: 'bigint',
    unsigned: true,
    nullable: true,
  })
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
    length: 50,
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

  @Column({
    name: Columns.User.CountryId,
    type: 'int',
    nullable: true,
  })
  countryId: number;

  @Column({
    name: Columns.User.RoleId,
    type: 'int',
    nullable: true,
  })
  roleId: number;

  @ManyToOne(() => Department, (department) => department.users, {
    nullable: true,
  })
  @JoinColumn({
    name: Columns.User.DepartmentId,
    foreignKeyConstraintName: Keys.User.ForeignKey.Department,
  })
  department: Department;

  @OneToMany(() => UserPermission, (up) => up.user)
  permissions: UserPermission[];

  @ManyToOne(() => Country, (country) => country.users)
  @JoinColumn({
    name: Columns.User.CountryId,
    foreignKeyConstraintName: Keys.User.ForeignKey.Country,
  })
  country: Country;

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @ManyToOne(() => Role, (role) => role.users, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: Columns.User.RoleId,
    foreignKeyConstraintName: Keys.User.ForeignKey.Role,
  })
  role: Role;
}
