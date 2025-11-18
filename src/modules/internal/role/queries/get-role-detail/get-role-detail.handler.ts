import { RoleType } from '@common/enum';
import { CommonException } from '@common/exceptions';
import { LoggerService } from '@core/services/logger';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '@src/infrastructure';
import { In, Not } from 'typeorm';

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
    const functionName = `${GetRoleDetailHandler.name} RoleId = ${query.id} =>`;
    this.logger.log(functionName);
    const role = await this.uow.roles.findOne({
      relations: {
        permissions: true,
      },
      where: {
        id: query.id,
        type: Not(In([RoleType.SuperAdmin, RoleType.User])),
      },
    });
    if (!role) {
      this.logger.warn(`${functionName} Role not found`);
      throw CommonException.NotFound('system.NOF.NOF_ERR_002');
    }

    return new GetRoleDetailResponse({
      id: role.id,
      name: role.name,
      description: role.description,
      permissionIds: role.permissions.map((x) => x.permissionId),
    });
  }
}
