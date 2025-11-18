import { CommonException } from '@common/exceptions';
import {
  CryptoJsHelper,
  JsonHelper,
  StringHelper,
  TimeHelper,
} from '@common/helper';
import { AcceptToAdminDto } from '@common/models';
import { JwtTokenService } from '@core/services/jwt';
import { LoggerService } from '@core/services/logger';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '@src/infrastructure';

import { AcceptToAdminCommand } from './accept-to-admin.command';

@CommandHandler(AcceptToAdminCommand)
export class AcceptToAdminHandler
  implements ICommandHandler<AcceptToAdminCommand>
{
  constructor(
    private readonly logger: LoggerService,
    private readonly uow: UnitOfWork,
    private readonly jwtService: JwtTokenService,
  ) {}

  async execute(command: AcceptToAdminCommand): Promise<void> {
    const functionName = `${AcceptToAdminHandler.name} =>`;
    this.logger.log(functionName);

    const decryptedToken = CryptoJsHelper.decrypt(
      decodeURIComponent(command.payload.token),
    );
    if (!decryptedToken) {
      this.logger.error(`${functionName} can not decrypt`);
      throw CommonException.BadRequest('internal.USER.USER_ERR_016');
    }

    const acceptToAdminDto = JsonHelper.deserialize(
      AcceptToAdminDto,
      decryptedToken,
    );

    const user = await this.uow.users.findOne({
      where: {
        id: acceptToAdminDto.userId,
      },
      select: {
        id: true,
        isConfirmed: true,
        firstName: true,
        lastName: true,
      },
    });

    if (!user) {
      this.logger.warn(`${functionName} User not found`);
      throw CommonException.NotFound('internal.USER.USER_ERR_001');
    }

    if (user.isConfirmed) {
      this.logger.warn(`${functionName} User already confirmed`);
      throw CommonException.BadRequest('internal.USER.USER_ERR_017');
    }

    try {
      this.jwtService.verify(acceptToAdminDto.token);
    } catch {
      this.logger.error(`${functionName} token invalid or expired`);
      throw CommonException.BadRequest('internal.USER.USER_ERR_016');
    }

    await this.uow.users.update(user.id, {
      isConfirmed: true,
      updatedAt: TimeHelper.nowUtc(),
      updatedBy: StringHelper.toFullName(user.firstName, user.lastName),
    });
  }
}
