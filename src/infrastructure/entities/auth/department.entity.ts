import { AuditTableEntity } from '@infrastructure/entities/audit-table-entity';
import {
  Columns,
  Keys,
  Schemas,
  Tables,
} from '@src/common/constant/entity.constant';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './user.entity';

@Entity({ name: Tables.Department, schema: Schemas.Ecommerce })
export class Department extends AuditTableEntity {
  @PrimaryGeneratedColumn('increment', {
    name: Columns.Base.ID,
    type: 'bigint',
    unsigned: true,
    primaryKeyConstraintName: Keys.Department.Primary,
  })
  id: number;

  @Column({
    name: Columns.Department.Name,
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  name: string;

  @OneToMany(() => User, (user) => user.department, { nullable: true })
  users: User[];
}
