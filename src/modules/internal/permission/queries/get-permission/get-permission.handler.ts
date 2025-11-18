import { LoggerService } from '@core/services/logger';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '@src/infrastructure';
import { IsNull } from 'typeorm';

import { GetPermissionQuery } from './get-permission.query';
import {
  ActionDto,
  GetPermissionResponse,
  PermissionModuleDto,
  SectionDto,
} from './get-permission.response';

@QueryHandler(GetPermissionQuery)
export class GetPermissionHandler
  implements IQueryHandler<GetPermissionQuery, GetPermissionResponse>
{
  constructor(
    private readonly logger: LoggerService,
    private readonly uow: UnitOfWork,
  ) {}

  async execute(): Promise<GetPermissionResponse> {
    const functionName = `${GetPermissionHandler.name} =>`;
    this.logger.log(functionName);
    const menu = await this.uow.menus.find({
      relations: {
        permissions: true,
        children: {
          permissions: true,
        },
      },
      where: {
        parentId: IsNull(),
      },
      select: {
        id: true,
        key: true,
        name: true,
        description: true,
        permissions: {
          id: true,
          key: true,
          name: true,
        },
        children: {
          id: true,
          key: true,
          name: true,
          permissions: {
            id: true,
            key: true,
            name: true,
            orderNo: true,
          },
        },
      },
      order: {
        orderNo: 'ASC',
      },
    });

    const response = new GetPermissionResponse();
    response.data = menu.map(
      (x) =>
        new PermissionModuleDto({
          id: x.id,
          key: x.key,
          label: x.name,
          description: x.description,
          actions: x.permissions
            ?.sort((a, b) => (a.orderNo ?? 0) - (b.orderNo ?? 0))
            .map((x) => new ActionDto({ id: x.id, key: x.key, label: x.name })),
          sections: x.children?.map(
            (x) =>
              new SectionDto({
                key: x.key,
                label: x.name,
                actions: x.permissions
                  ?.sort((a, b) => (a.orderNo ?? 0) - (b.orderNo ?? 0))
                  .map(
                    (x) =>
                      new ActionDto({
                        id: x.id,
                        key: x.key,
                        label: x.name,
                      }),
                  ),
              }),
          ),
        }),
    );

    return response;
  }
}
