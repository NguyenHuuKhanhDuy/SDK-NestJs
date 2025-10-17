import { Columns, Keys, Schemas, Tables } from '@common/constant';
import { NotificationSettingType } from '@common/enum';
import { AuditTableEntity } from '@infrastructure/entities/audit-table-entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { NotificationTemplate } from './notification-template.entity';

@Entity({
  name: Tables.NotificationSetting,
  schema: Schemas.Communication,
})
export class NotificationSetting extends AuditTableEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: Columns.Base.ID,
    primaryKeyConstraintName: Keys.NotificationSetting.Primary,
  })
  id: string;

  @Column({
    name: Columns.NotificationSetting.Name,
    type: 'varchar',
    nullable: true,
    length: 255,
  })
  name: string;

  @Column({
    name: Columns.NotificationSetting.Description,
    type: 'varchar',
    nullable: true,
    length: 255,
  })
  description: string;

  @Column({
    name: Columns.NotificationSetting.Type,
    type: 'int',
    nullable: false,
  })
  type: NotificationSettingType;

  @Column({
    name: Columns.NotificationSetting.IsUrgent,
    type: 'boolean',
    nullable: false,
  })
  isUrgent: boolean;

  @OneToMany(
    () => NotificationTemplate,
    (template) => template.notificationSetting,
    {
      onDelete: 'CASCADE',
    },
  )
  notificationTemplates: NotificationTemplate[];
}
