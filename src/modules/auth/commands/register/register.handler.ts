import { CommonConstant, Max, Min, Regex } from '@common/constant';
import { Provider, RoleType, UserStatus } from '@common/enum';
import { CommonException } from '@common/exceptions';
import {
  CryptoJsHelper,
  JsonHelper,
  SecurityHelper,
  StringHelper,
  TimeHelper,
} from '@common/helper';
import { LoggerService } from '@core/services/logger';
import { AuthService } from '@modules/auth/auth.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnitOfWork, User } from '@src/infrastructure';
import { CacheService } from '@src/integrations';

import { RegisterCommand } from './register.command';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    private readonly logger: LoggerService,
    private readonly uow: UnitOfWork,
    private readonly cacheService: CacheService,
    private readonly authService: AuthService,
  ) {}
  async execute(command: RegisterCommand): Promise<any> {
    const { password, ...payload } = command.payload;
    const functionName = `${RegisterHandler.name} Email = ${payload.email} =>`;
    this.logger.log(
      `${functionName} Payload: ${JsonHelper.serialize(payload)}`,
    );

    let passwordHash = CommonConstant.DefaultPassword;
    if (command.provider === Provider.Manual) {
      const passwordDecrypt = CryptoJsHelper.decrypt(password);
      if (!passwordDecrypt) {
        this.logger.error(`${functionName} Password decrypt failed`);
        throw CommonException.BadRequest('business.REG.REG_ERR_010');
      }

      if (!Regex.Password.test(passwordDecrypt)) {
        this.logger.error(`${functionName} Password format invalid`);
        throw CommonException.BadRequest('business.REG.REG_ERR_011', {
          min: Min.Password,
          max: Max.Password,
        });
      }

      passwordHash = await SecurityHelper.hash(passwordDecrypt);
    }

    const countries = await this.cacheService.getCountries();
    if (countries.length === 0) {
      this.logger.error(
        `${functionName} Get list of countries from cache not found`,
      );
    }

    const country = countries.find((x) => x.id === payload.countryId);
    if (!country) {
      this.logger.error(
        `${functionName} Get country ${payload.countryId} not found`,
      );
      throw CommonException.BadRequest('business.REG.REG_ERR_012');
    }

    const userRole = await this.uow.roles.findOne({
      where: {
        type: RoleType.User,
      },
      select: {
        id: true,
      },
    });
    if (!userRole) {
      this.logger.error(`${functionName} Get user role not found`);
      throw CommonException.Internal('system.EXH.EXH_ERR_001');
    }

    const userExisted = await this.uow.users.existsBy({
      email: payload.email.toLowerCase(),
    });
    if (userExisted) {
      this.logger.warn(`${functionName} Already existed user`);
      throw CommonException.BadRequest('business.REG.REG_ERR_013');
    }

    const newUser = JsonHelper.toInstance(User, {
      countryId: payload.countryId,
      email: payload.email.toLowerCase(),
      password: passwordHash,
      status: UserStatus.Active,
      isConfirmed: command.provider !== Provider.Manual,
      createdAt: TimeHelper.nowUtc(),
      provider: command.provider,
      departmentId: null,
      firstName: payload.firstName,
      lastName: payload.lastName,
      isSystemUser: false,
      username: payload.email.toLowerCase(),
      roleId: userRole.id,
      createdBy: StringHelper.toFullName(payload.firstName, payload.lastName),
    });

    await this.uow.users.insert(newUser);
    if (command.provider === Provider.Manual) {
      this.authService.handleSendConfirmationEmail(newUser);
    }
  }
}
