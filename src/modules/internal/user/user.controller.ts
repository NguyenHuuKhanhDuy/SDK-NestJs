import { PermissionConstant } from '@common/constant';
import { BaseController } from '@common/models';
import { Permissions } from '@core/decorator';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import { CreateAdminCommand, CreateAdminRequest } from './commands';
import { GetUserDetailQuery, GetUsersQuery, GetUsersRequest } from './queries';

@Controller({ path: 'internal/users', version: '1' })
@ApiTags('User')
export class UserController extends BaseController {
  constructor(
    private readonly query: QueryBus,
    private readonly command: CommandBus,
  ) {
    super();
  }

  @Post()
  @Permissions(PermissionConstant.User.Create)
  async getUsers2(@Body() body: CreateAdminRequest) {
    await this.command.execute(new CreateAdminCommand(body));
    return this.successResponse(null);
  }

  @Post('all')
  @Permissions(PermissionConstant.User.GetAll)
  async getUsers(@Body() body: GetUsersRequest) {
    const response = await this.query.execute(new GetUsersQuery(body));
    return this.pagingResponse(response.data, response.paging);
  }

  @Get(':id')
  @Permissions(PermissionConstant.User.GetDetail)
  async getUserDetail(@Param('id') userId: string) {
    const response = await this.query.execute(new GetUserDetailQuery(userId));
    return this.successResponse(response);
  }
}
