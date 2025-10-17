import { NotificationTemplateCode, TemplateCode } from '@common/enum';

export const SocketConstant = {
  Event: {
    Notification: 'notification',
    Announcement: 'announcement',
  },
};

export const HUB: Record<NotificationTemplateCode, string> = {
  [TemplateCode.N000001]: 'testHub',
};
