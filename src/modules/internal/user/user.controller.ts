import { PermissionConstant } from '@common/constant';
import { BaseController } from '@common/models';
import { Permissions } from '@core/decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import { GetUsersQuery, GetUsersRequest } from './queries';

@Controller({ path: 'internal/users', version: '1' })
@ApiTags('User')
export class UserController extends BaseController {
  constructor(private readonly query: QueryBus) {
    super();
  }

  @Post('all')
  @Permissions(PermissionConstant.User.GetAll)
  async getUsers(@Body() body: GetUsersRequest) {
    const response = await this.query.execute(new GetUsersQuery(body));
    return this.pagingResponse(response.data, response.paging);
  }
}
