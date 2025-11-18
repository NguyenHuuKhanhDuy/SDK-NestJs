import { Columns } from '@common/constant';
import { RoleType } from '@common/enum';
import { JsonHelper, QueryHelper, StringHelper } from '@common/helper';
import { LoggerService } from '@core/services/logger';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '@src/infrastructure';
import { In } from 'typeorm';

import { GetRolesQuery } from './get-roles.query';
import { GetRolesData, GetRolesResponse } from './get-roles.response';

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
    this.logger.log(
      `${functionName} Payload: ${JsonHelper.serialize(payload)}`,
    );

    const qb = this.uow.roles
      .createQueryBuilder('r')
      .where(`r.${Columns.Role.Type} not in (:...excludeTypes)`, {
        excludeTypes: [RoleType.SuperAdmin, RoleType.User],
      })
      .select(Columns.Base.ID, 'id')
      .addSelect(Columns.Role.Type, 'type')
      .addSelect(Columns.Role.Name, 'name')
      .addSelect(Columns.Role.Description, 'description')
      .orderBy(`r.${Columns.Role.Name}`, 'ASC');

    const pagingData = await QueryHelper.toListAsPageAsync<{
      id: number;
      description: string;
      name: string;
      type: RoleType;
    }>(qb, payload);

    const response = new GetRolesResponse();
    response.paging = pagingData.paging;
    if (!pagingData.data) {
      return response;
    }

    const roleIds = pagingData.data.map((x) => x.id);
    const userData = await this.uow.users.find({
      where: {
        roleId: In(roleIds),
      },
      select: {
        firstName: true,
        lastName: true,
        roleId: true,
      },
    });
    const userGroup = new Map<number, string[]>();

    for (const u of userData) {
      const fullName = StringHelper.toFullName(u.firstName, u.lastName);
      if (!userGroup.has(u.roleId)) {
        userGroup.set(u.roleId, []);
      }

      userGroup.get(u.roleId).push(fullName);
    }

    response.data = pagingData.data.map(
      (x) =>
        new GetRolesData({
          id: x.id,
          name: x.name,
          description: x.description,
          type: x.type,
          users: userGroup.get(x.id) ?? [],
        }),
    );
    return response;
  }
}
