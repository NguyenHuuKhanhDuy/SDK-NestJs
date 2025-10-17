import { Columns, Keys, Schemas, Tables } from '@common/constant';
import { LanguagesJsonbType } from '@core/services/communication';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AuditTableEntity } from '../audit-table-entity';
import { Notification } from './notification.entity';
import { NotificationSetting } from './notification-setting.entity';

@Entity({
  name: Tables.NotificationTemplate,
  schema: Schemas.Communication,
})
export class NotificationTemplate extends AuditTableEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: Columns.Base.ID,
    primaryKeyConstraintName: Keys.NotificationTemplate.Primary,
  })
  id: string;

  @Column({
    name: Columns.NotificationTemplate.Type,
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  type: string;

  @Column({
    name: Columns.NotificationTemplate.Code,
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  code: string;

  @Column({
    name: Columns.NotificationTemplate.Description,
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  description: string;

  @Column({
    name: Columns.NotificationTemplate.SettingId,
    type: 'uuid',
    nullable: false,
  })
  settingId: string;

  @Column({
    name: Columns.NotificationTemplate.EmailSender,
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  emailSender: string;

  @Column({
    name: Columns.NotificationTemplate.Subject,
    type: 'jsonb',
    nullable: true,
  })
  subject: LanguagesJsonbType;

  @Column({
    name: Columns.NotificationTemplate.ListOfRecipientTypes,
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  listOfRecipientTypes: string;

  @Column({
    name: Columns.NotificationTemplate.Content,
    type: 'jsonb',
    nullable: true,
  })
  content: LanguagesJsonbType;

  @Column({
    name: Columns.NotificationTemplate.IsLatestVersion,
    type: 'boolean',
    default: true,
  })
  isLatestVersion: boolean;

  @ManyToOne(() => NotificationSetting, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: Columns.NotificationTemplate.SettingId,
    foreignKeyConstraintName:
      Keys.NotificationTemplate.ForeignKey.NotificationSetting,
  })
  notificationSetting: NotificationSetting;

  @OneToMany(
    () => Notification,
    (notification) => notification.notificationTemplate,
    {
      onDelete: 'CASCADE',
    },
  )
  notifications: Notification[];
}
