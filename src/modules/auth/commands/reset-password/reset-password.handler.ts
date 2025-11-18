import { Max, Min, Regex } from '@common/constant';
import { CommonException } from '@common/exceptions';
import {
  CryptoJsHelper,
  JsonHelper,
  SecurityHelper,
  StringHelper,
  TimeHelper,
} from '@common/helper';
import { JwtTokenService } from '@core/services/jwt';
import { LoggerService } from '@core/services/logger';
import { ForgotPasswordDto } from '@modules/auth/dtos/forgot-password.dto';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '@src/infrastructure';

import { ResetPasswordCommand } from './reset-password.command';

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordHandler
  implements ICommandHandler<ResetPasswordCommand>
{
  constructor(
    private readonly logger: LoggerService,
    private readonly uow: UnitOfWork,
    private readonly jwtService: JwtTokenService,
  ) {}

  async execute(command: ResetPasswordCommand): Promise<void> {
    const functionName = `${ResetPasswordHandler.name} =>`;
    const payload = command.payload;
    this.logger.log(functionName);

    const decryptedToken = CryptoJsHelper.decrypt(
      decodeURIComponent(payload.token),
    );
    if (!decryptedToken) {
      this.logger.error(`${functionName} can not decrypt`);
      throw CommonException.BadRequest('business.FGP.FGP_ERR_004');
    }

    const forgotPasswordDto = JsonHelper.deserialize(
      ForgotPasswordDto,
      decryptedToken,
    );
    const user = await this.uow.users.findOne({
      where: {
        id: forgotPasswordDto.userId,
      },
      select: {
        id: true,
        isConfirmed: true,
        firstName: true,
        lastName: true,
      },
    });
    if (!user) {
      this.logger.error(`${functionName} User not found`);
      throw CommonException.NotFound('system.NOF.NOF_ERR_001');
    }

    if (!user.isConfirmed) {
      this.logger.error(`${functionName} User not confirmed`);
      throw CommonException.BadRequest('business.FGP.FGP_ERR_009');
    }

    const passwordDecrypted = CryptoJsHelper.decrypt(payload.password);
    if (!passwordDecrypted) {
      this.logger.error(`${functionName} Decrypt Password Errors`);
      throw CommonException.BadRequest('business.FGP.FGP_ERR_010');
    }

    if (!Regex.Password.test(passwordDecrypted)) {
      this.logger.error(`${functionName} Password length Errors`);
      throw CommonException.BadRequest('business.FGP.FGP_ERR_006', {
        min: Min.Password,
        max: Max.Password,
      });
    }

    try {
      this.jwtService.verify(forgotPasswordDto.token);
    } catch {
      this.logger.error(`${functionName} token invalid or expired`);
      throw CommonException.BadRequest('business.FGP.FGP_ERR_004');
    }

    const passwordHash = await SecurityHelper.hash(passwordDecrypted);
    await this.uow.users.update(user.id, {
      password: passwordHash,
      updatedBy: StringHelper.toFullName(user.firstName, user.lastName),
      updatedAt: TimeHelper.nowUtc(),
    });
  }
}
