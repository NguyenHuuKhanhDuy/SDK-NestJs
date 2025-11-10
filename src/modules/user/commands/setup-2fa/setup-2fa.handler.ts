import { CommonException } from '@common/exceptions';
import {
  CryptoJsHelper,
  SecurityHelper,
  StringHelper,
  TimeHelper,
} from '@common/helper';
import { RequestContextService } from '@common/interceptor';
import { LoggerService } from '@core/services/logger';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '@src/infrastructure';

import { Setup2faCommand } from './setup-2fa.command';
import { Setup2faResponse } from './setup-2fa.response';

@CommandHandler(Setup2faCommand)
export class Setup2faHandler
  implements ICommandHandler<Setup2faCommand, Setup2faResponse>
{
  constructor(
    private readonly logger: LoggerService,
    private readonly uow: UnitOfWork,
  ) {}

  async execute(): Promise<Setup2faResponse> {
    const userContext = RequestContextService.getUserContext();
    const functionName = `${Setup2faHandler.name} UserId = ${userContext.id}`;
    this.logger.log(functionName);
    const user = await this.uow.users.findOne({
      where: { id: userContext.id },
      select: {
        twoFactorEnabled: true,
      },
    });

    if (!user) {
      this.logger.error(`${functionName} User not found`);
      throw CommonException.NotFound('system.NOF.NOF_ERR_001');
    }

    if (user.twoFactorEnabled) {
      this.logger.error(`${functionName} 2FA already enabled`);
      throw CommonException.BadRequest('business.2FA.2FA_ERR_003');
    }

    const { base32, otpAuthUrl } = SecurityHelper.generateOtpSecret(
      `WeMasterTrade: ${userContext.email}`,
    );
    const base32Encrypt = CryptoJsHelper.encrypt(base32);
    const qrCode = await SecurityHelper.generateOtpQrCode(otpAuthUrl);
    const recoveryCode = SecurityHelper.generateRecoveryCode();

    await this.uow.users.update(userContext.id, {
      twoFactorSecret: base32Encrypt,
      recoveryCode: await SecurityHelper.hash(recoveryCode),
      updatedAt: TimeHelper.nowUtc(),
      updatedBy: StringHelper.toFullName(
        userContext.firstName,
        userContext.lastName,
      ),
    });

    return new Setup2faResponse({
      base32: base32Encrypt,
      qrCode: qrCode,
      recoveryCode: CryptoJsHelper.encrypt(recoveryCode),
    });
  }
}
