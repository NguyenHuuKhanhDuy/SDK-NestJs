import { BaseController } from '@common/models';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import { AddRoleCommand, AddRoleRequest } from './commands';
import * as Permissions from './queries/permissions';
import * as Roles from './queries/roles';

@Controller({ path: 'internal/authorize', version: '1' })
@ApiTags('Authorize')
export class BoAuthorizeController extends BaseController {
  constructor(
    private readonly query: QueryBus,
    private readonly command: CommandBus,
  ) {
    super();
  }

  @Post('roles')
  async addRole(@Body() body: AddRoleRequest) {
    await this.command.execute(new AddRoleCommand(body));
    return this.successResponse(null);
  }

  @Post('roles/get-all')
  async getRoles(@Body() body: Roles.GetRolesRequest) {
    const response = await this.query.execute(new Roles.GetRolesQuery(body));
    return this.pagingResponse(response.data, response.paging);
  }

  @Get('permissions')
  async getPermissions() {
    const response = await this.query.execute(
      new Permissions.GetPermissionsQuery(),
    );
    return this.successResponse(response.data);
  }

  @Get('roles/:roleId')
  async getRoleDetail(@Param('roleId') roleId: number) {
    const response = await this.query.execute(
      new Roles.GetRoleDetailQuery(roleId),
    );
    return this.successResponse(response);
  }

  // @Put('roles/:roleId')
  // async updateRoles(@Param('roleId') roleId: number, @Body() body: UpdateRole) {
  //   const response = await this.query.execute(
  //     new Roles.GetRoleDetailQuery(roleId),
  //   );
  //   return this.successResponse(response);
  // }
}
