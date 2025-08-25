import { Columns, Tables } from '@common/constant';
import { JsonHelper } from '@common/helper';
import { LoggerService } from '@core/services/logger';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '@src/infrastructure';

import { GetPermissionsQuery } from './get-permissions.query';
import {
  GetPermissionsResponse,
  GetPermissionsResponseItem,
} from './get-permissions.response';

@QueryHandler(GetPermissionsQuery)
export class GetPermissionsHandler
  implements IQueryHandler<GetPermissionsQuery, GetPermissionsResponse>
{
  constructor(
    private readonly logger: LoggerService,
    private readonly uow: UnitOfWork,
  ) {}

  async execute(query: GetPermissionsQuery): Promise<GetPermissionsResponse> {
    const payload = query.payload;
    const functionName = `${GetPermissionsHandler.name} UserId = ${payload.userId} =>`;
    this.logger.log(functionName);

    const userPermissionsQuery = this.uow.userPermissions
      .createQueryBuilder('up')
      .where(`up.${Columns.UserPermission.UserId} = :userId`)
      .select(
        `up.${Columns.UserPermission.PermissionId} as ${Columns.Base.ID}`,
      );

    const rolePermissionsQuery = this.uow.userRoles
      .createQueryBuilder('ur')
      .innerJoin(
        Tables.RolePermission,
        'rp',
        `rp.${Columns.RolePermission.RoleId} = ur.${Columns.UserRole.RoleId}`,
      )
      .where(`ur.${Columns.UserRole.UserId} = :userId`)
      .select(
        `rp.${Columns.RolePermission.PermissionId} as ${Columns.Base.ID}`,
      );

    const permissionsQuery = this.uow.menus
      .createQueryBuilder('m')
      .select([
        `m.${Columns.Base.ID} as menu_id`,
        `m.${Columns.Menu.Name} as menu_name`,
        `m.${Columns.Menu.Key} as menu_key`,
        `p.${Columns.Base.ID} as permission_id`,
        `p.${Columns.Permission.Name} as permission_name`,
        `p.${Columns.Permission.Key} as permission_key`,
      ])
      .innerJoin(
        Tables.Permission,
        'p',
        `m.${Columns.Base.ID} = p.${Columns.Permission.MenuId}`,
      )
      .innerJoin(
        `(${userPermissionsQuery.getQuery()} UNION ${rolePermissionsQuery.getQuery()})`,
        'data',
        `data.${Columns.Base.ID} = p.${Columns.Base.ID}`,
      )
      .setParameters({
        userId: payload.userId,
      });
    const permissionsData = await permissionsQuery.getRawMany<{
      menu_id: string;
      menu_name: string;
      menu_key: string;
      permission_id: string;
      permission_name: string;
      permission_key: string;
    }>();
    const response = new GetPermissionsResponse();
    const group = JsonHelper.groupBy(permissionsData, ['menu_id']);
    response.data = Object.values(group).map(
      (item) =>
        new GetPermissionsResponseItem({
          menuKey: item[0].menu_key,
          permissions: item.map((x) => x.permission_key),
        }),
    );

    return response;
  }
}
