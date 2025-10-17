import { AttachmentData } from '@sendgrid/helpers/classes/attachment';

export class EmailDataDto {
  toEmail: string;
  subject: string;
  template: string;
  attachments: AttachmentData[];
  emailSender: string;
}
