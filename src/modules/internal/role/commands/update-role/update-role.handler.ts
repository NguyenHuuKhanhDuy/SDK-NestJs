import { RoleType } from '@common/enum';
import { CommonException } from '@common/exceptions';
import { JsonHelper, StringHelper, TimeHelper } from '@common/helper';
import { RequestContextService } from '@common/interceptor';
import { LoggerService } from '@core/services/logger';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '@src/infrastructure';
import { In, Not } from 'typeorm';

import { UpdateRoleCommand } from './update-role.command';

@CommandHandler(UpdateRoleCommand)
export class UpdateRoleHandler implements ICommandHandler<UpdateRoleCommand> {
  constructor(
    private readonly logger: LoggerService,
    private readonly uow: UnitOfWork,
  ) {}

  async execute(command: UpdateRoleCommand): Promise<void> {
    const payload = command.payload;
    const user = RequestContextService.getUserContext();
    const functionName = StringHelper.format(
      '{0} UserId = {1}, RoleId {2} =>',
      UpdateRoleHandler.name,
      user.id,
      payload.id,
    );
    this.logger.log(
      `${functionName} Payload = ${JsonHelper.serialize(payload)}`,
    );

    await this.uow.withTransaction(async (u) => {
      const role = await this.uow.roles.findOne({
        relations: { permissions: true },
        where: {
          id: payload.id,
          type: Not(In([RoleType.SuperAdmin, RoleType.User])),
        },
        select: {
          id: true,
          permissions: {
            permissionId: true,
          },
        },
      });
      if (!role) {
        this.logger.warn(`${functionName} Role not found`);
        throw CommonException.NotFound('system.NOF.NOF_ERR_002');
      }

      // Update base role info
      await u.roles.update(role.id, {
        name: payload.name,
        description: payload.description,
        updatedAt: TimeHelper.nowUtc(),
        updatedBy: StringHelper.toFullName(user.firstName, user.lastName),
      });

      const existingIds = role.permissions.map((x) => x.permissionId);
      const incomingIds = payload.permissionIds;

      // NEW permissions → INSERT
      const toAdd = incomingIds.filter((x) => !existingIds.includes(x));
      if (toAdd.length > 0) {
        const addData = toAdd.map((pid) => ({
          roleId: role.id,
          permissionId: pid,
        }));

        await u.rolePermissions.insert(addData);
      }

      // REMOVED → DELETE
      const toRemove = existingIds.filter((x) => !incomingIds.includes(x));
      if (toRemove.length > 0) {
        await u.rolePermissions.delete({
          roleId: role.id,
          permissionId: In(toRemove),
        });
      }
    });
  }
}
