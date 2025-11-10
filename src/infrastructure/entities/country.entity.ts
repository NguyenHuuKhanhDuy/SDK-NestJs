import { Columns, Keys, Schemas, Tables } from '@common/constant';
import { User } from '@src/infrastructure/entities/auth/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: Tables.Country, schema: Schemas.BackOffice })
export class Country {
  @PrimaryGeneratedColumn('increment', {
    name: Columns.Base.ID,
    type: 'int',
    primaryKeyConstraintName: Keys.Country.Primary,
  })
  id: number;

  @Column({
    name: Columns.Country.Name,
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    name: Columns.Country.FlagUrl,
    type: 'varchar',
    nullable: false,
  })
  flagUrl: string;

  @Column({
    name: Columns.Country.DialCode,
    type: 'varchar',
    nullable: false,
  })
  dialCode: string;

  @Column({
    name: Columns.Country.Alpha2Code,
    type: 'varchar',
    nullable: false,
  })
  alpha2Code: string;

  @Column({
    name: Columns.Country.Alpha3Code,
    type: 'varchar',
    nullable: false,
  })
  alpha3Code: string;

  @OneToMany(() => User, (user) => user.country)
  users: User[];
}
