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

import { Toggle2faCommand } from './toggle-2fa.command';

@CommandHandler(Toggle2faCommand)
export class Toggle2faHandler implements ICommandHandler<Toggle2faCommand> {
  constructor(
    private readonly logger: LoggerService,
    private readonly uow: UnitOfWork,
  ) {}

  async execute(command: Toggle2faCommand): Promise<void> {
    const userContext = RequestContextService.getUserContext();
    const payload = command.payload;
    const functionName = `${Toggle2faHandler.name} UserId = ${userContext.id}`;
    this.logger.log(functionName);
    const user = await this.uow.users.findOne({
      where: {
        id: userContext.id,
      },
      select: {
        twoFactorSecret: true,
        twoFactorEnabled: true,
      },
    });

    if (!user) {
      this.logger.error(`${functionName} User not found`);
      throw CommonException.NotFound('system.NOF.NOF_ERR_001');
    }

    if (user.twoFactorEnabled === payload.isEnable) {
      this.logger.error(`${functionName} 2FA already state`);
      throw CommonException.BadRequest('business.2FA.2FA_ERR_003');
    }

    if (!user.twoFactorSecret) {
      this.logger.error(`${functionName} 2FA secret not found`);
      throw CommonException.BadRequest('business.2FA.2FA_ERR_008');
    }

    const codeDecrypt = CryptoJsHelper.decrypt(payload.code);
    if (!codeDecrypt) {
      this.logger.error(`${functionName} Invalid 2FA code`);
      throw CommonException.BadRequest('business.2FA.2FA_ERR_002');
    }

    const twoFactorSecretDecrypt = CryptoJsHelper.decrypt(user.twoFactorSecret);
    const isValid = SecurityHelper.verifyOtpToken(
      codeDecrypt,
      twoFactorSecretDecrypt,
    );
    if (!isValid) {
      this.logger.error(`${functionName} Invalid 2FA code`);
      throw CommonException.BadRequest('business.2FA.2FA_ERR_002');
    }

    await this.uow.users.update(userContext.id, {
      twoFactorEnabled: payload.isEnable,
      updatedAt: TimeHelper.nowUtc(),
      updatedBy: StringHelper.toFullName(
        userContext.firstName,
        userContext.lastName,
      ),
    });
    this.logger.log(
      `${functionName} 2FA verified successfully`,
      userContext.id,
    );
  }
}
