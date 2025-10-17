import * as fs from 'node:fs';
import * as path from 'node:path';

import { EnvKey } from '@common/constant';
import {
  NotificationSettingType,
  TemplateCode,
  TemplateFormat,
} from '@common/enum';
import { CommonHelper, JsonHelper, TimeHelper } from '@common/helper';
import { LoggerService } from '@core/services/logger';
import { MailService } from '@core/services/mail';
import { BaseRedisService, RedisConstant } from '@core/services/redis';
import { HUB, SocketConstant, SocketService } from '@core/services/socket';
import { SocketNotificationDto } from '@core/services/socket/dtos';
import { Injectable } from '@nestjs/common';
import { ConfigEnvironmentService } from '@src/configs/config-environment.base.service';
import {
  Notification,
  NotificationTemplate,
  UnitOfWork,
} from '@src/infrastructure';
import * as handlebars from 'handlebars';

import { EmailDataDto, Language, SendNotificationDto } from './dtos';

@Injectable()
class CommunicationService {
  // Constants
  private static readonly ADMIN_ID = 'Admin';
  private static readonly TEMPLATE_VAR_REGEX = /{{([a-zA-Z0-9]+)}}/;
  private static readonly PARTIALS_DIR = path.join(__dirname, 'partials');

  // Configs
  private readonly emailSender = ConfigEnvironmentService.getIns().get(
    EnvKey.SendGrid.Email,
  );
  private readonly emailSenderName = ConfigEnvironmentService.getIns().get(
    EnvKey.SendGrid.Name,
  );

  // Cached template language blocks for socket emission
  private notificationTemplate!: Language[];
  private notificationTitle!: Language[];

  // eslint-disable-next-line max-params
  constructor(
    private readonly logger: LoggerService,
    private readonly redis: BaseRedisService,
    private readonly uow: UnitOfWork,
    private readonly mailService: MailService,
    private readonly socketIo: SocketService,
  ) {}

  /**
   * Orchestrates building notifications & sending email/socket events.
   */
  async send(message: SendNotificationDto): Promise<void> {
    const fn = `${CommunicationService.name} - ${this.send.name}`;
    this.logger.log(`${fn} - Message: ${JSON.stringify(message)}`);

    // Normalize to array for possible future batch support
    const messages: SendNotificationDto[] = [message];

    const notifications = await this.handleMessage(
      message.notificationTemplateCode,
      messages,
    );

    if (notifications.length === 0) {
      return;
    }

    const inserted = await this.uow.notifications.insert(notifications);
    if (inserted) {
      await this.sendNotify(notifications, message);
    }
  }

  /**
   * Build notifications per template & message(s).
   * - Email: render content + subject, then send emails (no DB row).
   * - InAppNotification: create Notification entities (to be inserted later).
   * - SMS: (reserved) – no-op to keep parity with original.
   */
  private async handleMessage(
    templateCode: TemplateCode,
    messages: SendNotificationDto[],
  ): Promise<Notification[]> {
    const fn = `${CommunicationService.name} - ${this.handleMessage.name}`;
    const allNotifications: Notification[] = [];

    // Resolve template (from Redis cache or DB) by code (enum string)
    const template = await this.getNotificationTemplate(
      TemplateCode[templateCode],
    );
    if (!template) {
      this.logger.warn(
        `${fn} => Cannot get notification template ${templateCode}`,
      );
      return allNotifications; // keep flow safe
    }

    // Cache language blocks for later socket emission
    this.notificationTemplate = template.content.languages;
    this.notificationTitle = template.subject.languages;

    this.logger.log(
      `${fn} => NotificationTemplate = ${JsonHelper.serialize(template)}`,
    );

    for (const msg of messages) {
      if (!this.isValidMessage(msg)) {
        continue;
      }

      switch (template.notificationSetting.type) {
        case NotificationSettingType.Email: {
          await this.sendEmailNotifications(template, msg);
          break;
        }

        case NotificationSettingType.SMS: {
          // Reserved for future SMS provider; keep parity with original code.
          break;
        }

        case NotificationSettingType.InAppNotification: {
          // Build Notification entities; DB insert occurs in `send()`
          const content = JsonHelper.serialize(msg.contentModel);
          const notifications = await this.buildInAppNotifications(
            content,
            msg,
            template.id,
          );
          allNotifications.push(...notifications);
          break;
        }

        default:
          // Keep behavior safe if a new type appears
          this.logger.warn(
            `${fn} => Unsupported notification type: ${template.notificationSetting.type}`,
          );
          break;
      }
    }

    return allNotifications;
  }

  /**
   * Fetch template from Redis cache or DB, and cache it.
   */
  private async getNotificationTemplate(
    code: string,
  ): Promise<NotificationTemplate | null> {
    const fn = `${CommunicationService.name} - ${this.getNotificationTemplate.name}`;
    this.logger.log(fn);

    // Try cache first
    const cached = await this.redis.hget<NotificationTemplate>(
      RedisConstant.Key.AllNotificationTemplates,
      code,
    );
    if (cached?.content?.languages) {
      return cached;
    }

    // Fallback to DB
    const fromDb = await this.uow.notificationTemplates.findOne({
      relations: { notificationSetting: true },
      where: { code, isLatestVersion: true },
    });

    // Cache regardless of null; avoids hot-loop querying when missing
    await this.redis.hset(
      RedisConstant.Key.AllNotificationTemplates,
      code,
      fromDb as any,
    );

    return fromDb ?? null;
  }

  /**
   * Quick validation: must have at least 1 recipient.
   */
  private isValidMessage(message: SendNotificationDto): boolean {
    return Array.isArray(message.recipients) && message.recipients.length > 0;
  }

  /**
   * Render a template content by language with Handlebars + partials.
   * Keeps original behavior of returning raw template if no vars are present.
   */
  private async handleTemplateContent(
    langs: Language[],
    contentModel: object,
    lang: string,
    format: TemplateFormat,
  ): Promise<string> {
    const templateContent = CommonHelper.getTemplateByLanguage(langs, lang);

    // If no handlebars placeholder or empty model → return as-is
    if (
      !CommunicationService.TEMPLATE_VAR_REGEX.test(templateContent) ||
      contentModel === null ||
      contentModel.toString().trim() === ''
    ) {
      return templateContent;
    }

    return this.renderContentAsync(templateContent, contentModel, format);
  }

  /**
   * Register partials + helpers once per render call.
   * NOTE: Kept signature to preserve original public surface area.
   */
  async registerHelpersAndPartials(
    _templateFormat: TemplateFormat,
  ): Promise<void> {
    // Register partials (if any)
    if (fs.existsSync(CommunicationService.PARTIALS_DIR)) {
      fs.readdirSync(CommunicationService.PARTIALS_DIR).forEach((filename) => {
        const matches = /^([^.]+)\.hbs$/.exec(filename);
        if (!matches) {
          return;
        }

        const name = matches[1];
        const filepath = path.join(CommunicationService.PARTIALS_DIR, filename);
        let content = fs.readFileSync(filepath, 'utf8');

        // Remove BOM if present
        content = content.replace(/^\uFEFF/, '');
        handlebars.registerPartial(name, content);
      });
    }

    // Common helpers
    handlebars.registerHelper('eq', (a, b) => a === b);
  }

  /**
   * Compile + render handlebars content with the provided model.
   */
  public async renderContentAsync<TModel>(
    content: string,
    model: TModel,
    templateFormat: TemplateFormat,
  ): Promise<string> {
    await this.registerHelpersAndPartials(templateFormat);
    const template = handlebars.compile(content);
    return template(model as any);
  }

  /**
   * Build Notification entities for in-app flow (no DB IO here).
   */
  private async buildInAppNotifications(
    content: string,
    message: SendNotificationDto,
    notificationTemplateId: string,
  ): Promise<Notification[]> {
    const notifications: Notification[] = [];
    const now = TimeHelper.nowUtc();

    for (const recipient of message.recipients) {
      if (!recipient.recipientId) {
        continue;
      }

      const combinedModel = {
        ...recipient.personalizeContentModel,
        ...message.contentModel,
      };

      const notification = JsonHelper.toInstance(Notification, {
        userId: recipient.recipientId,
        notificationTemplateId,
        message: JsonHelper.serialize(combinedModel),
        link: recipient.link,
        sendingTime: now,
        succeedSendingTime: now,
        createdAt: now,
        isRead: false,
        createdBy: message.createdBy ?? CommunicationService.ADMIN_ID,
        readAt: null,
        actionData: { ...message.actionData },
      });

      // Fallback userId in actionData to recipientId if empty/whitespace
      const actionUserId = notification.actionData.userId;
      notification.actionData.userId =
        actionUserId && actionUserId.trim()
          ? actionUserId
          : recipient.recipientId;

      notifications.push(notification);
    }

    return notifications;
  }

  /**
   * Send email notifications for all recipients with emails.
   */
  private async sendEmailNotifications(
    template: NotificationTemplate,
    message: SendNotificationDto,
  ): Promise<void> {
    if (!template.subject || !template.content) {
      this.logger.error('sendEmailNotifications => subject or content is null');
      return;
    }

    for (const recipient of message.recipients) {
      if (!recipient.recipientEmail) {
        continue;
      }

      const combinedModel = {
        ...recipient.personalizeContentModel,
        ...message.contentModel,
      };
      const personalSubject = await this.handleTemplateContent(
        template.subject.languages,
        combinedModel,
        recipient.language,
        TemplateFormat.Text,
      );
      const personalContent = await this.handleTemplateContent(
        template.content.languages,
        combinedModel,
        recipient.language,
        TemplateFormat.Text,
      );

      const emailData: EmailDataDto = {
        toEmail: recipient.recipientEmail,
        subject: personalSubject,
        template: personalContent,
        emailSender: template.emailSender,
        attachments: [],
      };

      await this.sendMail(emailData);
    }
  }

  /**
   * Low-level email sender.
   */
  private async sendMail(emailData: EmailDataDto): Promise<void> {
    await this.mailService.send({
      to: emailData.toEmail,
      from: {
        name: this.emailSenderName,
        email: emailData.emailSender ?? this.emailSender,
      },
      subject: emailData.subject,
      html: emailData.template,
      attachments: emailData.attachments,
    });
  }

  /**
   * Emit socket notification after DB insert is successful.
   */
  private async sendNotify(
    notifications: Notification[],
    message: SendNotificationDto,
  ): Promise<void> {
    const fn = `${CommunicationService.name} - ${this.sendNotify.name}`;
    const templateCode = message.notificationTemplateCode;
    const hubName = HUB[templateCode];

    if (!hubName) {
      this.logger.error(`${fn} => Invalid template code: ${templateCode}`);
      return;
    }

    for (const notification of notifications) {
      // Render display title & content for socket
      const contentModel = JSON.parse(notification.message);
      const content = await this.handleTemplateContent(
        this.notificationTemplate,
        contentModel,
        message.language,
        TemplateFormat.Html,
      );

      const title = await this.handleTemplateContent(
        this.notificationTitle,
        contentModel,
        message.language,
        TemplateFormat.Html,
      );

      const payload: SocketNotificationDto = {
        name: hubName,
        data: message.relatedData,
        message: {
          title,
          content,
          createdDate: notification.createdAt,
        },
      };

      this.socketIo.emitToUser(
        notification.userId,
        SocketConstant.Event.Notification,
        payload,
      );
    }
  }

  /**
   * Utility: strip HTML tags (kept from original for parity).
   */
  private removeHtmlTags(input: string): string {
    return input
      .replace(/<\/?[^>]+(>|$)/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }
}

export default CommunicationService;
