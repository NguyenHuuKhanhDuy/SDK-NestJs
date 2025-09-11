import { LoggerService } from '@core/services/logger';
import { GetMenusQuery } from '@internal/menu/queries/get-menus/get-menus.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '@src/infrastructure';

import { GetMenusData, GetMenusResponse } from './get-menus.response';

@QueryHandler(GetMenusQuery)
export class GetMenusHandler
  implements IQueryHandler<GetMenusQuery, GetMenusResponse>
{
  constructor(
    private readonly logger: LoggerService,
    private readonly uow: UnitOfWork,
  ) {}

  async execute(): Promise<GetMenusResponse> {
    const functionName = `${GetMenusHandler.name} =>`;
    this.logger.log(`${functionName}`);
    const menus = await this.uow.menus.find({
      where: { isActive: true },
      order: { orderNo: 'ASC' },
    });

    const map = new Map<string, GetMenusData>();

    menus.forEach((m) => {
      map.set(m.id, {
        id: m.id,
        name: m.name,
        path: m.link,
        children: [],
      });
    });

    const tree: GetMenusData[] = [];

    menus.forEach((m) => {
      const node = map.get(m.id);
      if (m.parentId) {
        const parent = map.get(m.parentId);
        if (parent) {
          parent.children.push(node);
        }
      } else {
        tree.push(node);
      }
    });

    const response = new GetMenusResponse();
    response.data = tree;
    return response;
  }
}
