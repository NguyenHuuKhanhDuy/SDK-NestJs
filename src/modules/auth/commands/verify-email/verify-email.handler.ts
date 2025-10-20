import { CommonException } from '@common/exceptions';
import {
  CryptoJsHelper,
  JsonHelper,
  StringHelper,
  TimeHelper,
} from '@common/helper';
import { JwtTokenService } from '@core/services/jwt';
import { LoggerService } from '@core/services/logger';
import { EmailConfirmationDto } from '@modules/auth/dtos/email-confirmation.dto';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '@src/infrastructure';

import { VerifyEmailCommand } from './verify-email.command';

@CommandHandler(VerifyEmailCommand)
export class VerifyEmailHandler implements ICommandHandler<VerifyEmailCommand> {
  constructor(
    private readonly logger: LoggerService,
    private readonly uow: UnitOfWork,
    private readonly jwtService: JwtTokenService,
  ) {}

  async execute(command: VerifyEmailCommand): Promise<any> {
    const functionName = `${VerifyEmailHandler.name} =>`;
    this.logger.log(functionName);

    const decryptedToken = CryptoJsHelper.decrypt(command.payload.token);
    if (!decryptedToken) {
      this.logger.error(`${functionName} can not decrypt`);
      throw CommonException.BadRequest('business.VRE.VRE_ERR_003');
    }

    const emailConfirmationDto = JsonHelper.deserialize(
      EmailConfirmationDto,
      decryptedToken,
    );

    const user = await this.uow.users.findOne({
      where: {
        id: emailConfirmationDto.userId,
      },
      select: {
        id: true,
        isConfirmed: true,
        firstName: true,
        lastName: true,
      },
    });
    if (!user) {
      this.logger.error(`${functionName} user not found`);
      throw CommonException.NotFound('business.VRE.VRE_ERR_005');
    }

    if (user.isConfirmed) {
      this.logger.warn(`${functionName} user already confirmed`);
      throw CommonException.BadRequest('business.VRE.VRE_ERR_001');
    }

    try {
      this.jwtService.verify(emailConfirmationDto.token);
    } catch {
      this.logger.error(`${functionName} token invalid or expired`);
      throw CommonException.BadRequest('business.VRE.VRE_ERR_003');
    }

    await this.uow.users.update(user.id, {
      isConfirmed: true,
      updatedAt: TimeHelper.nowUtc(),
      updatedBy: StringHelper.format('{0} {1}', user.firstName, user.lastName),
    });
  }
}
