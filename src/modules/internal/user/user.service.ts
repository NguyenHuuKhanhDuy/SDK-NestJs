import { EnvKey } from '@common/constant';
import { TemplateCode } from '@common/enum';
import { CryptoJsHelper, JsonHelper, StringHelper } from '@common/helper';
import { AcceptToAdminDto } from '@common/models';
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

@Injectable()
export class UserService {
  constructor(
    private readonly logger: LoggerService,
    private readonly queue: QueueUnitOfWork,
    private readonly jwtService: JwtTokenService,
  ) {}

  sendEmailInviteToAdmin(user: User) {
    const domain = ConfigEnvironmentService.getIns().get(EnvKey.App.BaseUri);
    const acceptToAdminToken = this.jwtService.sign(
      {
        username: user.username,
        email: user.email,
        sub: user.id,
        provider: user.provider,
      },
      '1h',
    );

    const acceptToAdminInfoEncrypted = CryptoJsHelper.encrypt(
      JsonHelper.serialize(new AcceptToAdminDto(acceptToAdminToken, user.id)),
    );
    const acceptToAdminLink = `${domain}/accept-to-admin?token=${acceptToAdminInfoEncrypted}`;

    const sendNotificationDto = JsonHelper.toInstance(SendNotificationDto, {
      recipients: [
        {
          recipientId: user.id,
          recipientEmail: user.email,
          personalizeContentModel: {
            userName: StringHelper.toFullName(user.firstName, user.lastName),
          },
        },
      ],
      contentModel: {
        ...CommunicationConstant.BaseAsset,
        inviteUrl: acceptToAdminLink,
        expireTime: '1 hour',
      },
      notificationTemplateCode: TemplateCode.E000003,
    });
    void this.queue.notification.sendNotification(sendNotificationDto);
  }
}
