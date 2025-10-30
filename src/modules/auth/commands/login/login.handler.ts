import { RoleType, Site } from '@common/enum';
import { JwtTokenService } from '@core/services/jwt';
import { LoggerService } from '@core/services/logger';
import { RedisService } from '@core/services/redis';
import { UnitOfWork } from '@infrastructure/repositories/unit-of-work';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonConstant } from '@src/common/constant';
import { CommonException } from '@src/common/exceptions';
import { CryptoJsHelper, SecurityHelper } from '@src/common/helper';
import { JwtUserDto } from '@src/common/models';

import { LoginCommand } from './login.command';
import { LoginResponse } from './login.response';

@CommandHandler(LoginCommand)
export class LoginHandler
  implements ICommandHandler<LoginCommand, LoginResponse>
{
  constructor(
    private readonly logger: LoggerService,
    private readonly jwtService: JwtTokenService,
    private readonly uow: UnitOfWork,
    private readonly redis: RedisService,
  ) {}

  async execute(command: LoginCommand): Promise<LoginResponse> {
    const payload = command.payload;
    const functionName = `${LoginHandler.name} =>`;
    const response = new LoginResponse();
    this.logger.log(functionName);
    const isSystemUser = command.site === Site.Admin;
    const user = await this.uow.users.findOne({
      relations: {
        permissions: true,
        roles: {
          role: true,
        },
      },
      where: { email: payload.email, isSystemUser: isSystemUser },
      select: {
        id: true,
        status: true,
        password: true,
        email: true,
        isSystemUser: true,
        firstName: true,
        lastName: true,
        roles: {
          roleId: true,
          role: {
            id: true,
            type: true,
          },
        },
      },
    });
    if (!user) {
      this.logger.warn(`${functionName} User not found`);
      throw CommonException.NotFound('business.LGI.LGI_ERR_001');
    }

    const passwordDecrypted = CryptoJsHelper.decrypt(payload.password);
    if (!passwordDecrypted) {
      this.logger.warn(`${functionName} Password decryption failed`);
      throw CommonException.BadRequest('business.LGI.LGI_ERR_002');
    }

    const isValidPassword = await SecurityHelper.verify(
      passwordDecrypted,
      user.password,
    );
    if (!isValidPassword) {
      this.logger.warn(`${functionName} Password verification failed`);
      throw CommonException.Unauthorized('business.LGI.LGI_ERR_002');
    }

    const sessionId = SecurityHelper.generateSessionId();
    const userData: JwtUserDto = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles.map((role) => role.roleId),
      permissions: user.permissions.map(
        (permission) => permission.permissionId,
      ),
      isSuperAdmin: !!user.roles.find(
        (x) => x.role.type === RoleType.SuperAdmin,
      ),
      sessionId: sessionId,
    };

    // Store session in Redis
    await this.redis.createSession(
      user.id,
      sessionId,
      sessionId,
      CommonConstant.TokenExpires,
    );

    response.expiresIn = CommonConstant.TokenExpires;
    response.accessToken = this.jwtService.sign(
      userData,
      CommonConstant.TokenExpires,
    );

    return response;
  }
}
