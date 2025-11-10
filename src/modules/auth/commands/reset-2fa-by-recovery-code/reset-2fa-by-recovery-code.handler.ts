import { CommonException } from '@common/exceptions';
import {
  CryptoJsHelper,
  SecurityHelper,
  StringHelper,
  TimeHelper,
} from '@common/helper';
import { LoggerService } from '@core/services/logger';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '@src/infrastructure';

import { Reset2faByRecoveryCodeCommand } from './reset-2fa-by-recovery-code.command';

@CommandHandler(Reset2faByRecoveryCodeCommand)
export class Reset2faByRecoveryCodeHandler
  implements ICommandHandler<Reset2faByRecoveryCodeCommand>
{
  constructor(
    private readonly logger: LoggerService,
    private readonly uow: UnitOfWork,
  ) {}

  async execute(command: Reset2faByRecoveryCodeCommand): Promise<void> {
    const payload = command.payload;
    const functionName = `${Reset2faByRecoveryCodeHandler.name} Email = ${payload.email} =>`;
    this.logger.log(functionName);
    const user = await this.uow.users.findOne({
      where: {
        email: payload.email.toLowerCase(),
      },
      select: {
        id: true,
        twoFactorEnabled: true,
        recoveryCode: true,
        firstName: true,
        lastName: true,
      },
    });
    if (!user) {
      this.logger.warn(`${functionName} User not found`);
      throw CommonException.NotFound('system.NOF.NOF_ERR_001');
    }

    if (!user.twoFactorEnabled) {
      this.logger.warn(`${functionName} 2FA hasn't been enabled`);
      throw CommonException.BadRequest('business.2FA.2FA_ERR_004');
    }

    const recoveryCode = CryptoJsHelper.decrypt(payload.recoveryCode);
    if (!recoveryCode) {
      this.logger.warn(`${functionName} Recovery code invalid`);
      throw CommonException.BadRequest('business.2FA.2FA_ERR_005');
    }

    const isValid = await SecurityHelper.verify(
      recoveryCode,
      user.recoveryCode,
    );
    if (!isValid) {
      this.logger.warn(`${functionName} Recovery code invalid`);
      throw CommonException.BadRequest('business.2FA.2FA_ERR_005');
    }

    await this.uow.users.update(user, {
      twoFactorEnabled: false,
      twoFactorSecret: null,
      recoveryCode: null,
      updatedBy: StringHelper.toFullName(user.firstName, user.lastName),
      updatedAt: TimeHelper.nowUtc(),
    });
    this.logger.log(`${functionName} 2FA reset successfully`);
  }
}
