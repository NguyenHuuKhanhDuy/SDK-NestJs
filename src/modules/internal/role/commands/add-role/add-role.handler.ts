import { RoleType } from '@common/enum';
import { CommonException } from '@common/exceptions';
import { JsonHelper, StringHelper, TimeHelper } from '@common/helper';
import { RequestContextService } from '@common/interceptor';
import { LoggerService } from '@core/services/logger';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Role, RolePermission, UnitOfWork } from '@src/infrastructure';
import { In } from 'typeorm';

import { AddRoleCommand } from './add-role.command';

@CommandHandler(AddRoleCommand)
export class AddRoleHandler implements ICommandHandler<AddRoleCommand> {
  constructor(
    private readonly logger: LoggerService,
    private readonly uow: UnitOfWork,
  ) {}

  async execute(command: AddRoleCommand): Promise<void> {
    const user = RequestContextService.getUserContext();
    const payload = command.payload;
    const functionName = `${AddRoleHandler.name} UserId = ${user.id} =>`;
    this.logger.log(
      `${functionName} Payload = ${JsonHelper.serialize(payload)}`,
    );

    const permissionCount = await this.uow.permissions.count({
      where: {
        id: In(payload.permissionIds),
      },
    });
    if (permissionCount !== payload.permissionIds.length) {
      this.logger.warn(`${functionName} Permission not found`);
      throw CommonException.NotFound('internal.ROL.ROL_ERR_001');
    }

    await this.uow.withTransaction(async (u) => {
      const role = JsonHelper.toInstance(Role, {
        name: payload.name,
        description: payload.description,
        type: RoleType.Other,
        createdAt: TimeHelper.nowUtc(),
        createdBy: StringHelper.toFullName(user.firstName, user.lastName),
      });

      await u.roles.insert(role);
      const rolePermissions = payload.permissionIds.map((x) =>
        JsonHelper.toInstance(RolePermission, {
          permissionId: x,
          roleId: role.id,
        }),
      );

      await u.rolePermissions.insert(rolePermissions);
    });
  }
}
