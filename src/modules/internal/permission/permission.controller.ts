import { BaseController } from '@common/models';
import { Controller, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import { GetPermissionQuery } from './queries';

@Controller({ path: 'internal/permissions', version: '1' })
@ApiTags('Permissions')
export class PermissionController extends BaseController {
  constructor(
    private readonly query: QueryBus,
    private readonly command: CommandBus,
  ) {
    super();
  }

  @Get()
  async getPermissions() {
    const response = await this.query.execute(new GetPermissionQuery());
    return this.successResponse(response.data);
  }
}
