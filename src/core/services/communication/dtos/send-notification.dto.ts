import { LanguageConstant } from '@common/constant';
import { TemplateCode } from '@common/enum';

export class SendNotificationDto {
  recipients: RecipientInfo[];
  contentModel: Record<string, any>;
  notificationTemplateCode: TemplateCode;
  language?: string = LanguageConstant.Default;
  actionData?: NotificationActionData;
  attachmentUrls?: string[];
  relatedData?: Record<string, any>;
  createdBy?: string;
}

export class RecipientInfo {
  recipientId: string;
  recipientEmail?: string;
  language?: string = LanguageConstant.Default;
  personalizeContentModel?: Record<string, any>;
  link?: string = null;
}

export class NotificationActionData {
  userId?: string = null;
}
