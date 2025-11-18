import { Columns, Tables } from '@common/constant';
import { JsonHelper, QueryHelper } from '@common/helper';
import { LoggerService } from '@core/services/logger';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '@src/infrastructure';
import { Brackets } from 'typeorm';

import { GetUsersQuery } from './get-users.query';
import { GetUsersData, GetUsersResponse } from './get-users.response';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler
  implements IQueryHandler<GetUsersQuery, GetUsersResponse>
{
  constructor(
    private readonly logger: LoggerService,
    private readonly uow: UnitOfWork,
  ) {}

  async execute(query: GetUsersQuery): Promise<GetUsersResponse> {
    const { payload } = query;
    const functionName = `${GetUsersHandler.name} =>`;

    this.logger.log(
      `${functionName} Payload: ${JsonHelper.serialize(payload)}`,
    );

    const userQuery = this.uow.users
      .createQueryBuilder('u')
      .select([
        `u.${Columns.Base.ID} AS id`,
        `u.${Columns.User.Email} AS email`,
        `u.${Columns.User.FirstName} AS first_name`,
        `u.${Columns.User.LastName} AS last_name`,
        `u.${Columns.User.IsConfirmed} AS is_confirmed`,
        `u.${Columns.User.Status} AS status`,
        `u.${Columns.Base.CreatedAt} AS created_at`,
        `r.${Columns.Role.Name} AS role_name`,
      ])
      .innerJoin(
        Tables.Role,
        'r',
        `u.${Columns.User.RoleId} = r.${Columns.Base.ID}`,
      );

    // Filter by status
    if (payload.status?.length) {
      userQuery.andWhere(`u.${Columns.User.Status} IN (:...status)`, {
        status: payload.status,
      });
    }

    // Filter by search keyword
    if (payload.search) {
      userQuery.andWhere(
        new Brackets((qb) =>
          qb
            .where(`u.${Columns.User.Email} ILIKE :search`)
            .orWhere(
              `CONCAT(u.${Columns.User.FirstName}, ' ', u.${Columns.User.LastName}) ILIKE :search`,
            ),
        ),
        { search: QueryHelper.ILikePattern(payload.search) },
      );
    }

    if (payload.roleId) {
      userQuery.andWhere(`r.${Columns.Base.ID} = :roleId`, {
        roleId: payload.roleId,
      });
    }

    // Pagination
    const pagingData = await QueryHelper.toListAsPageAsync<{
      id: string;
      email: string;
      first_name: string;
      last_name: string;
      is_confirmed: boolean;
      status: number;
      created_at: Date;
      role_name: string;
    }>(userQuery, payload);

    const response = new GetUsersResponse();
    response.data = pagingData.data.map(
      (u) =>
        new GetUsersData({
          id: u.id,
          email: u.email,
          firstName: u.first_name,
          lastName: u.last_name,
          isConfirmed: u.is_confirmed,
          status: u.status,
          createdAt: u.created_at,
          role: u.role_name,
        }),
    );
    response.paging = pagingData.paging;

    return response;
  }
}
