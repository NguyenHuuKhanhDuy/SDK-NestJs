import { CommonException } from '@common/exceptions';
import { StringHelper } from '@common/helper';
import { RequestContextService } from '@common/interceptor';
import { LoggerService } from '@core/services/logger';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '@src/infrastructure';

import { GetPermissionsQuery } from './get-permissions.query';
import { GetPermissionsResponse } from './get-permissions.response';

@QueryHandler(GetPermissionsQuery)
export class GetPermissionsHandler
  implements IQueryHandler<GetPermissionsQuery, GetPermissionsResponse>
{
  constructor(
    private readonly logger: LoggerService,
    private readonly uow: UnitOfWork,
  ) {}

  async execute(): Promise<GetPermissionsResponse> {
    const userId = RequestContextService.getCurrentUserId();
    const functionName = StringHelper.format(
      '{0} UserId = {1}',
      GetPermissionsHandler.name,
      userId,
    );
    this.logger.log(functionName);
    const user = await this.uow.users.findOne({
      relations: {
        role: {
          permissions: {
            permission: true,
          },
        },
        permissions: true,
      },
      where: { id: userId },
      select: {
        permissions: {
          permissionId: true,
          permission: {
            id: true,
            key: true,
          },
        },
        role: {
          id: true,
          type: true,
          permissions: {
            permissionId: true,
            permission: {
              id: true,
              key: true,
            },
          },
        },
      },
    });

    if (!user) {
      this.logger.error(`${functionName} User not found`);
      throw CommonException.NotFound('system.NOF.NOF_ERR_001');
    }

    const response = new GetPermissionsResponse();
    response.roleType = user.role.type;
    const rolePermissions = user.role.permissions.map((x) => x.permission.key);
    response.permissions = [
      ...rolePermissions,
      ...user.permissions.map((x) => x.permission.key),
    ];
    return response;
  }
}
