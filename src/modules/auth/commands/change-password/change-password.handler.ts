import { Max, Min, Regex } from '@common/constant';
import { CommonException } from '@common/exceptions';
import {
  CryptoJsHelper,
  SecurityHelper,
  StringHelper,
  TimeHelper,
} from '@common/helper';
import { RequestContextService } from '@common/interceptor';
import { LoggerService } from '@core/services/logger';
import { RedisService } from '@core/services/redis';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '@src/infrastructure';

import { ChangePasswordCommand } from './change-password.command';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler
  implements ICommandHandler<ChangePasswordCommand>
{
  constructor(
    private readonly logger: LoggerService,
    private readonly uow: UnitOfWork,
    private readonly redisService: RedisService,
  ) {}

  async execute(command: ChangePasswordCommand): Promise<void> {
    const { payload } = command;
    const userContext = RequestContextService.getUserContext();
    const userId = userContext.id;
    const functionName = `${ChangePasswordHandler.name} - UserId=${userId}`;

    this.logger.log(`${functionName} executing...`);

    // 1️⃣ Validate: old and new password must be different
    if (payload.oldPassword === payload.newPassword) {
      this.logger.warn(`${functionName} New password same as old password`);
      throw CommonException.BadRequest('business.CHP.CHP_ERR_002');
    }

    // 2️⃣ Decrypt passwords
    const oldPassword = CryptoJsHelper.decrypt(payload.oldPassword);
    const newPassword = CryptoJsHelper.decrypt(payload.newPassword);

    if (!oldPassword) {
      this.logger.error(`${functionName} Failed to decrypt old password`);
      throw CommonException.BadRequest('business.CHP.CHP_ERR_007');
    }

    if (!newPassword) {
      this.logger.error(`${functionName} Failed to decrypt new password`);
      throw CommonException.BadRequest('business.CHP.CHP_ERR_006');
    }

    // 3️⃣ Validate new password format
    if (!Regex.Password.test(newPassword)) {
      this.logger.warn(`${functionName} Password format invalid`);
      throw CommonException.BadRequest('business.CHP.CHP_ERR_005', {
        min: Min.Password,
        max: Max.Password,
      });
    }

    // 4️⃣ Fetch user from DB
    const user = await this.uow.users.findOne({
      where: { id: userId },
      select: { password: true },
    });

    if (!user) {
      this.logger.error(`${functionName} User not found`);
      throw CommonException.NotFound('business.CHP.CHP_ERR_008');
    }

    // 5️⃣ Verify old password
    const isOldPasswordValid = await SecurityHelper.verify(
      oldPassword,
      user.password,
    );

    if (!isOldPasswordValid) {
      this.logger.warn(`${functionName} Old password incorrect`);
      throw CommonException.BadRequest('business.CHP.CHP_ERR_001');
    }

    // 6️⃣ Hash new password
    const newPasswordHash = await SecurityHelper.hash(newPassword);

    // 7️⃣ Update password and invalidate sessions
    await this.uow.users.update(userId, {
      password: newPasswordHash,
      updatedBy: StringHelper.format(
        '{0} {1}',
        userContext.firstName,
        userContext.lastName,
      ),
      updatedAt: TimeHelper.nowUtc(),
    });

    await this.redisService.removeAllSessions(userId);

    this.logger.log(`${functionName} Password changed successfully`);
  }
}
