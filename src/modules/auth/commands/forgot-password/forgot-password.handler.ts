import { EnvKey } from '@common/constant';
import { Provider, TemplateCode } from '@common/enum';
import { CommonException } from '@common/exceptions';
import { CryptoJsHelper, JsonHelper, StringHelper } from '@common/helper';
import {
  CommunicationConstant,
  SendNotificationDto,
} from '@core/services/communication';
import { JwtTokenService } from '@core/services/jwt';
import { LoggerService } from '@core/services/logger';
import { QueueUnitOfWork } from '@core/services/queue';
import { ForgotPasswordDto } from '@modules/auth/dtos/forgot-password.dto';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConfigEnvironmentService } from '@src/configs';
import { UnitOfWork } from '@src/infrastructure';

import { ForgotPasswordCommand } from './forgot-password.command';

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordHandler
  implements ICommandHandler<ForgotPasswordCommand>
{
  constructor(
    private readonly logger: LoggerService,
    private readonly uow: UnitOfWork,
    private readonly jwtService: JwtTokenService,
    private readonly queue: QueueUnitOfWork,
  ) {}

  async execute(command: ForgotPasswordCommand): Promise<any> {
    const email = command.payload.email;
    const functionName = `${ForgotPasswordHandler.name} Email = ${email} =>`;
    this.logger.log(functionName);

    const user = await this.uow.users.findOne({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        isConfirmed: true,
        provider: true,
        email: true,
      },
    });
    if (!user) {
      this.logger.warn(`${functionName} User not found`);
      throw CommonException.NotFound('business.FGP.FGP_ERR_002');
    }

    if (user.provider === Provider.Manual && !user.isConfirmed) {
      this.logger.warn(`${functionName} User email not verified`);
      throw CommonException.BadRequest('business.FGP.FGP_ERR_009');
    }

    const domain = ConfigEnvironmentService.getIns().get(EnvKey.App.BaseUri);
    const forgotPasswordToken = this.jwtService.sign(
      {
        username: user.username,
        email: user.email,
        sub: user.id,
        provider: user.provider,
      },
      3600, // 1 hour
    );

    const forgotPasswordInfoEncrypted = CryptoJsHelper.encrypt(
      JsonHelper.serialize(new ForgotPasswordDto(forgotPasswordToken, user.id)),
    );

    const forgotPasswordLink = `${domain}/reset-password?token=${forgotPasswordInfoEncrypted}`;
    const sendNotificationDto = JsonHelper.toInstance(SendNotificationDto, {
      recipients: [
        {
          recipientId: user.id,
          recipientEmail: user.email,
          personalizeContentModel: {
            fullName: StringHelper.format(
              '{0} {1}',
              user.firstName,
              user.lastName,
            ),
          },
        },
      ],
      contentModel: {
        ...CommunicationConstant.BaseAsset,
        forgotPasswordLink: forgotPasswordLink,
      },
      notificationTemplateCode: TemplateCode.E000002,
    });
    void this.queue.notification.sendNotification(sendNotificationDto);
  }
}
