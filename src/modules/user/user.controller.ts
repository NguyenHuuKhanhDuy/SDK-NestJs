import { BaseController } from '@common/models';
import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import { GetPermissionsQuery } from './queries';

@Controller({ path: 'user', version: '1' })
@ApiTags('User')
export class UserController extends BaseController {
  constructor(private readonly query: QueryBus) {
    super();
  }

  @Get('permissions')
  async getPermissions() {
    const response = await this.query.execute(new GetPermissionsQuery());

    return this.successResponse(response.data);
  }
}
