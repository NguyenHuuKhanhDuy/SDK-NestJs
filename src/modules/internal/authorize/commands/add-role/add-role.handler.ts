import { CommonException } from '@common/exceptions';
import { JsonHelper } from '@common/helper';
import { RequestContextService } from '@common/interceptor';
import { LoggerService } from '@core/services/logger';
import { AddRoleCommand } from '@internal/authorize/commands/add-role/add-role.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Role, RolePermission, UnitOfWork } from '@src/infrastructure';
import { In } from 'typeorm';

@CommandHandler(AddRoleCommand)
export class AddRoleHandler implements ICommandHandler<AddRoleCommand> {
  constructor(
    private readonly logger: LoggerService,
    private readonly uow: UnitOfWork,
  ) {}

  async execute(command: AddRoleCommand): Promise<void> {
    const payload = command.payload;
    const functionName = `${AddRoleHandler.name} =>`;
    this.logger.log(
      `${functionName} Payload: ${JsonHelper.serialize(payload)}`,
    );

    const role = JsonHelper.toInstance(Role, {
      name: payload.name,
      description: payload.description,
      createdBy: RequestContextService.getCurrentUserFullName(),
    });

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

    await this.uow.roles.insert(role);
    const rolePermissions = payload.permissions.map((x) =>
      JsonHelper.toInstance(RolePermission, {
        roleId: role.id,
        permissionId: x,
      }),
    );
    await this.uow.rolePermissions.insert(rolePermissions);
  }
}
