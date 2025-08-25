import { CommonException } from '@common/exceptions';
import { JsonHelper, TimeHelper } from '@common/helper';
import { LoggerService } from '@core/services/logger';
import { UpdateRoleCommand } from '@internal/authorize/commands/update-role/update-role.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RolePermission, UnitOfWork } from '@src/infrastructure';
import { In } from 'typeorm';

@CommandHandler(UpdateRoleCommand)
export class UpdateRoleHandler implements ICommandHandler<UpdateRoleCommand> {
  constructor(
    private readonly logger: LoggerService,
    private readonly uow: UnitOfWork,
  ) {}

  async execute(command: UpdateRoleCommand): Promise<void> {
    const { roleId, ...payload } = command.payload;
    const functionName = `${UpdateRoleHandler.name} RoleId = ${roleId} =>`;
    this.logger.log(functionName);

    if (payload.permissions && payload.permissions.length > 0) {
      const permissions = await this.uow.permissions.count({
        where: {
          id: In(payload.permissions),
        },
      });

      if (permissions !== payload.permissions.length) {
        this.logger.warn(
          `${functionName} Some permissions do not exist: ${JsonHelper.serialize(
            payload.permissions,
          )}`,
        );
        throw CommonException.BadRequest('business.ROL.ROL_ERR_004');
      }
    }

    await this.uow.roles.update(roleId, {
      name: payload.name,
      description: payload.description,
      updatedAt: TimeHelper.nowUtc(),
    });
    const rolePermissions = payload.permissions.map((x) =>
      JsonHelper.toInstance(RolePermission, {
        roleId: roleId,
        permissionId: x,
      }),
    );
    await this.uow.rolePermissions.insert(rolePermissions);
  }
}
