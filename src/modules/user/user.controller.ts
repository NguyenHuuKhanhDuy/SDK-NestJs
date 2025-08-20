import { BaseController } from '@common/models';
import { CurrentUser } from '@core/decorator';
import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import { GetPermissionsQuery, GetPermissionsRequest } from './queries';

@Controller({ path: 'user', version: '1' })
@ApiTags('User')
export class UserController extends BaseController {
  constructor(private readonly query: QueryBus) {
    super();
  }

  @Get('permissions')
  async getPermissions(@CurrentUser('id') userId: string) {
    const response = await this.query.execute(
      new GetPermissionsQuery(new GetPermissionsRequest(userId)),
    );

    return this.successResponse(response.data);
  }
}
