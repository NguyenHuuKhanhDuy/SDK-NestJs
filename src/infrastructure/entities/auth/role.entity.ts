import { RoleType } from '@common/enum';
import { RolePermission, User } from '@infrastructure/entities';
import { AuditTableEntity } from '@infrastructure/entities/audit-table-entity';
import {
  Columns,
  Keys,
  Schemas,
  Tables,
} from '@src/common/constant/entity.constant';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: Tables.Role, schema: Schemas.Ecommerce })
export class Role extends AuditTableEntity {
  @PrimaryGeneratedColumn('increment', {
    name: Columns.Base.ID,
    primaryKeyConstraintName: Keys.Role.Primary,
  })
  id: number;

  @Column({
    name: Columns.Role.Name,
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  name: string;

  @Column({
    name: Columns.Role.Description,
    type: 'varchar',
    length: 512,
    nullable: true,
  })
  description: string;

  @Column({ name: Columns.Role.Type, type: 'int', nullable: false })
  type: RoleType;

  @OneToMany(() => RolePermission, (rp) => rp.role)
  permissions: RolePermission[];

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
