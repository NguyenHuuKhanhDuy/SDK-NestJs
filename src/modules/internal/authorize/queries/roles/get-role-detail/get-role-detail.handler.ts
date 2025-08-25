import { CommonConstant } from '@common/constant';
import { CommonException } from '@common/exceptions';
import { LoggerService } from '@core/services/logger';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '@src/infrastructure';
import { Not } from 'typeorm';

import { GetRoleDetailQuery } from './get-role-detail.query';
import { GetRoleDetailResponse } from './get-role-detail.response';

@QueryHandler(GetRoleDetailQuery)
export class GetRoleDetailHandler
  implements IQueryHandler<GetRoleDetailQuery, GetRoleDetailResponse>
{
  constructor(
    private readonly logger: LoggerService,
    private readonly uow: UnitOfWork,
  ) {}

  async execute(query: GetRoleDetailQuery): Promise<GetRoleDetailResponse> {
    const roleId = query.roleId;
    const functionName = `${GetRoleDetailHandler.name} =>`;
    this.logger.log(`${functionName} RoleId: ${roleId}`);
    const role = await this.uow.roles.findOne({
      relations: {
        permissions: {
          permission: true,
        },
      },
      where: {
        id: roleId,
        name: Not(CommonConstant.RoleNameDefault),
      },
      select: {
        id: true,
        name: true,
        description: true,
        permissions: {
          permissionId: true,
          permission: {
            key: true,
          },
        },
      },
    });
    if (!role) {
      this.logger.warn(`${functionName} Role not found`);
      throw CommonException.NotFound('business.ROL.ROL_ERR_001');
    }

    const response = new GetRoleDetailResponse();
    response.id = role.id;
    response.name = role.name;
    response.description = role.description;
    response.permissions = role.permissions.reduce<Record<string, boolean>>(
      (acc, x) => {
        acc[x.permission.key] = true;
        return acc;
      },
      {},
    );
    return response;
  }
}
