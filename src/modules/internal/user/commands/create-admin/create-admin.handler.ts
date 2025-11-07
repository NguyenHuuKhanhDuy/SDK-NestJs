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
import { RequestContextService } from '@common/interceptor';
import { LoggerService } from '@core/services/logger';
import { UserService } from '@internal/user/user.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnitOfWork, User } from '@src/infrastructure';
import { CacheService } from '@src/integrations';
import { Not } from 'typeorm';

import { CreateAdminCommand } from './create-admin.command';

@CommandHandler(CreateAdminCommand)
export class CreateAdminHandler implements ICommandHandler<CreateAdminCommand> {
  constructor(
    private readonly logger: LoggerService,
    private readonly uow: UnitOfWork,
    private readonly cacheService: CacheService,
    private readonly userService: UserService,
  ) {}

  async execute(command: CreateAdminCommand): Promise<void> {
    const userContext = RequestContextService.getUserContext();
    const { password, ...payload } = command.payload;
    const functionName = `${CreateAdminHandler.name} UserId = ${userContext.id} =>`;
    this.logger.log(
      `${functionName} Payload = ${JsonHelper.serialize(payload)}`,
    );

    let passwordHash = CommonConstant.DefaultPassword;
    const passwordDecrypt = CryptoJsHelper.decrypt(password);
    if (!passwordDecrypt) {
      this.logger.error(`${functionName} Password decrypt failed`);
      throw CommonException.BadRequest('internal.USER.USER_ERR_009');
    }

    if (!Regex.Password.test(passwordDecrypt)) {
      this.logger.error(`${functionName} Password format invalid`);
      throw CommonException.BadRequest('internal.USER.USER_ERR_010', {
        min: Min.Password,
        max: Max.Password,
      });
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
      throw CommonException.BadRequest('internal.USER.USER_ERR_011');
    }

    const role = await this.uow.roles.findOne({
      where: {
        id: payload.roleId,
        type: Not(RoleType.User),
      },
      select: {
        id: true,
      },
    });
    if (!role) {
      this.logger.error(`${functionName} Get user role not found`);
      throw CommonException.Internal('system.EXH.EXH_ERR_001');
    }

    const userExisted = await this.uow.users.existsBy({
      email: payload.email.toLowerCase(),
    });
    if (userExisted) {
      this.logger.warn(`${functionName} Already existed user`);
      throw CommonException.BadRequest('internal.USER.USER_ERR_012');
    }

    passwordHash = await SecurityHelper.hash(passwordDecrypt);
    const newUser = JsonHelper.toInstance(User, {
      countryId: payload.countryId,
      email: payload.email.toLowerCase(),
      password: passwordHash,
      status: UserStatus.Active,
      isConfirmed: false,
      createdAt: TimeHelper.nowUtc(),
      provider: Provider.Manual,
      departmentId: null,
      firstName: payload.firstName,
      lastName: payload.lastName,
      isSystemUser: true,
      username: payload.email.toLowerCase(),
      roleId: role.id,
      createdBy: StringHelper.toFullName(
        userContext.firstName,
        userContext.lastName,
      ),
    });

    await this.uow.users.insert(newUser);
    this.userService.sendEmailInviteToAdmin(newUser);
    this.logger.log(
      `${functionName} Create admin ${payload.email} successfully`,
    );
  }
}
