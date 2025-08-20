import { Columns, Tables } from '@common/constant';
import { JsonHelper } from '@common/helper';
import { LoggerService } from '@core/services/logger';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '@src/infrastructure';

import { GetPermissionsAssignmentsQuery } from './get-permissions-assignments.query';
import {
  GetPermissionByMenuItem,
  GetPermissionByMenuPermission,
  GetPermissionsAssignmentsResponse,
} from './get-permissions-assignments.response';

@QueryHandler(GetPermissionsAssignmentsQuery)
export class GetPermissionsAssignmentsHandler
  implements
    IQueryHandler<
      GetPermissionsAssignmentsQuery,
      GetPermissionsAssignmentsResponse
    >
{
  constructor(
    private readonly logger: LoggerService,
    private readonly uow: UnitOfWork,
  ) {}

  async execute(
    query: GetPermissionsAssignmentsQuery,
  ): Promise<GetPermissionsAssignmentsResponse> {
    const payload = query.payload;
    const functionName = `${GetPermissionsAssignmentsHandler.name} =>`;
    this.logger.log(
      `${functionName} Start processing with payload: ${JsonHelper.serialize(payload)}`,
    );

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
        `p.${Columns.Base.ID} as permission_id`,
        `p.${Columns.Permission.Name} as permission_name`,
        `CASE WHEN data.${Columns.Base.ID} IS NOT NULL THEN true ELSE false END AS assigned`,
      ])
      .innerJoin(
        Tables.Permission,
        'p',
        `m.${Columns.Base.ID} = p.${Columns.Permission.MenuId}`,
      )
      .leftJoin(
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
      permission_id: string;
      permission_name: string;
      assigned: boolean;
    }>();

    const response = new GetPermissionsAssignmentsResponse();
    const group = JsonHelper.groupBy(permissionsData, ['menu_id']);
    response.data = Object.values(group).map(
      (item) =>
        new GetPermissionByMenuItem({
          id: item[0].menu_id,
          name: item[0].menu_name,
          permissions: item.map(
            (permission) =>
              new GetPermissionByMenuPermission({
                id: permission.permission_id,
                name: permission.permission_name,
                assigned: permission.assigned,
              }),
          ),
        }),
    );

    return response;
  }
}
