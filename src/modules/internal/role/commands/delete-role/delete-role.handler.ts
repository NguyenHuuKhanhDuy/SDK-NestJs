import { RoleType } from '@common/enum';
import { CommonException } from '@common/exceptions';
import { StringHelper } from '@common/helper';
import { RequestContextService } from '@common/interceptor';
import { LoggerService } from '@core/services/logger';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '@src/infrastructure';
import { In, Not } from 'typeorm';

import { DeleteRoleCommand } from './delete-role.command';

@CommandHandler(DeleteRoleCommand)
export class DeleteRoleHandler implements ICommandHandler<DeleteRoleCommand> {
  constructor(
    private readonly logger: LoggerService,
    private readonly uow: UnitOfWork,
  ) {}

  async execute(command: DeleteRoleCommand): Promise<void> {
    const user = RequestContextService.getUserContext();
    const functionName = StringHelper.format(
      '{0} UserId = {1}, RoleId {2} =>',
      DeleteRoleHandler.name,
      user.id,
      command.id,
    );
    this.logger.log(functionName);
    const existed = await this.uow.roles.existsBy({
      id: command.id,
      type: Not(In([RoleType.SuperAdmin, RoleType.User])),
    });
    if (!existed) {
      this.logger.warn(`${functionName} Role not found`);
      throw CommonException.NotFound('system.NOF.NOF_ERR_002');
    }

    await this.uow.roles.delete(command.id);
  }
}
