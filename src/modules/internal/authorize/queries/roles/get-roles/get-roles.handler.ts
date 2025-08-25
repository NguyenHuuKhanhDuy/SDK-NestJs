import { QueryHelper } from '@common/helper';
import { LoggerService } from '@core/services/logger';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '@src/infrastructure';

import { GetRolesQuery } from './get-roles.query';
import {
  GetRolesData,
  GetRolesResponse,
  GetRolesUserData,
} from './get-roles.response';

@QueryHandler(GetRolesQuery)
export class GetRolesHandler
  implements IQueryHandler<GetRolesQuery, GetRolesResponse>
{
  constructor(
    private readonly logger: LoggerService,
    private readonly uow: UnitOfWork,
  ) {}

  async execute(query: GetRolesQuery): Promise<GetRolesResponse> {
    const payload = query.payload;
    const functionName = `${GetRolesHandler.name} =>`;
    this.logger.log(`${functionName}`);

    const [data, count] = await this.uow.roles.findAndCount({
      relations: {
        users: {
          user: true,
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        users: {
          roleId: true,
          user: {
            id: true,
            firstName: true,
          },
        },
      },
      order: { createdAt: 'DESC' },
      ...QueryHelper.generatePagingOptions(payload),
    });

    const response = new GetRolesResponse();
    response.data = data.map(
      (x) =>
        new GetRolesData({
          id: x.id,
          name: x.name,
          description: x.description,
          createdAt: x.createdAt,
          updatedAt: x.updatedAt,
          users: x.users.map(
            (u) =>
              new GetRolesUserData({ id: u.user.id, name: u.user.firstName }),
          ),
        }),
    );

    response.paging = QueryHelper.calcPagination(payload, count);
    return response;
  }
}
