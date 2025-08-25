import { LoggerService } from '@core/services/logger';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Menu, UnitOfWork } from '@src/infrastructure';

import { GetPermissionsQuery } from './get-permissions.query';
import {
  GetPermissionsData,
  GetPermissionsItem,
  GetPermissionsResponse,
} from './get-permissions.response';

@QueryHandler(GetPermissionsQuery)
export class GetPermissionsHandler
  implements IQueryHandler<GetPermissionsQuery, GetPermissionsResponse>
{
  constructor(
    private readonly logger: LoggerService,
    private readonly uow: UnitOfWork,
  ) {}

  async execute(): Promise<GetPermissionsResponse> {
    const functionName = `${GetPermissionsHandler.name} =>`;
    this.logger.log(`${functionName}`);
    const menus = await this.uow.menus.find({
      relations: { permissions: true },
    });
    const map = new Map<string, GetPermissionsData>();
    const roots: GetPermissionsData[] = [];

    menus.forEach((menu) => {
      map.set(menu.id, this.mapMenuToPermissions(menu));
    });

    menus.forEach((menu) => {
      if (menu.parentId) {
        const parent = map.get(menu.parentId);
        if (parent) {
          parent.children.push(map.get(menu.id));
        }
      } else {
        roots.push(map.get(menu.id));
      }
    });

    const response = new GetPermissionsResponse();
    response.data = roots;
    return response;
  }

  private mapMenuToPermissions(menu: Menu): GetPermissionsData {
    return new GetPermissionsData({
      id: menu.id,
      name: menu.name,
      description: menu.description,
      permissions: menu.permissions.map((x) => {
        return new GetPermissionsItem({
          id: x.id,
          name: x.name,
          description: x.description,
        });
      }),
      children: [],
    });
  }
}
