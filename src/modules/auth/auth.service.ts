import { EnvKey } from '@common/constant';
import { TemplateCode } from '@common/enum';
import { CryptoJsHelper, JsonHelper } from '@common/helper';
import {
  CommunicationConstant,
  SendNotificationDto,
} from '@core/services/communication';
import { JwtTokenService } from '@core/services/jwt';
import { LoggerService } from '@core/services/logger';
import { QueueUnitOfWork } from '@core/services/queue';
import { Injectable } from '@nestjs/common';
import { ConfigEnvironmentService } from '@src/configs';
import { User } from '@src/infrastructure';

import { EmailConfirmationDto } from './dtos/email-confirmation.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly jwtService: JwtTokenService,
    private readonly queue: QueueUnitOfWork,
  ) {}

  public handleSendConfirmationEmail(user: User) {
    const domain = ConfigEnvironmentService.getIns().get(EnvKey.App.BaseUri);
    const emailConfirmationToken = this.jwtService.sign(
      {
        username: user.username,
        email: user.email,
        sub: user.id,
        provider: user.provider,
      },
      '365 days',
    );

    const emailConfirmationInfoEncrypted = CryptoJsHelper.encrypt(
      JsonHelper.serialize(
        new EmailConfirmationDto(user.id, emailConfirmationToken),
      ),
    );
    const emailConfirmationLink = `${domain}/verify?token=${encodeURIComponent(
      emailConfirmationInfoEncrypted,
    )}`;

    const sendNotificationDto = JsonHelper.toInstance(SendNotificationDto, {
      recipients: [
        {
          recipientId: user.id,
          recipientEmail: user.email,
          personalizeContentModel: {
            firstName: user.firstName,
          },
        },
      ],
      contentModel: {
        ...CommunicationConstant.BaseAsset,
        confirmUrl: emailConfirmationLink,
      },
      notificationTemplateCode: TemplateCode.E000001,
    });
    void this.queue.notification.sendNotification(sendNotificationDto);
  }
}
