import { Columns, Keys, Schemas, Tables } from '@common/constant';
import { NotificationActionData } from '@core/services/communication/dtos/send-notification.dto';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AuditTableEntity } from '../audit-table-entity';
import { NotificationTemplate } from './notification-template.entity';

@Entity({
  name: Tables.Notification,
  schema: Schemas.Communication,
})
export class Notification extends AuditTableEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: Columns.Base.ID,
    primaryKeyConstraintName: Keys.Notification.Primary,
  })
  id: string;

  @Column({
    name: Columns.Notification.UserId,
    type: 'uuid',
    nullable: false,
  })
  userId: string;

  @Column({
    name: Columns.Notification.TemplateId,
    type: 'uuid',
  })
  notificationTemplateId: string;

  @Column({
    name: Columns.Notification.Message,
    type: 'varchar',
    length: 3000,
    nullable: true,
  })
  message: string;

  @Column({
    name: Columns.Notification.Link,
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  link: string;

  @Column({
    name: Columns.Notification.SendingTime,
    type: 'timestamp with time zone',
    nullable: false,
  })
  sendingTime: Date;

  @Column({
    name: Columns.Notification.SuccessSendingTime,
    type: 'timestamp with time zone',
    nullable: false,
  })
  succeedSendingTime: Date;

  @Column({
    name: Columns.Notification.IsRead,
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isRead: boolean;

  @Column({
    name: Columns.Notification.ReadAt,
    type: 'timestamp with time zone',
    nullable: true,
  })
  readAt: Date;

  @Column({
    name: Columns.Notification.ActionData,
    type: 'jsonb',
    nullable: true,
  })
  actionData: NotificationActionData;

  @ManyToOne(() => NotificationTemplate, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: Columns.Notification.TemplateId,
    foreignKeyConstraintName: Keys.Notification.ForeignKey.NotificationTemplate,
  })
  notificationTemplate: NotificationTemplate;
}
