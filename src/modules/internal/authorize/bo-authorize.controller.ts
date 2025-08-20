import { BaseController } from '@common/models';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import { AddRoleCommand, AddRoleRequest } from './commands';
import {
  GetPermissionsAssignmentsQuery,
  GetPermissionsAssignmentsRequest,
} from './queries';

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

  @Get('users/:userId/permissions/assignments')
  async getPermissionsAssignments(
    @Body() body: GetPermissionsAssignmentsRequest,
  ) {
    const response = await this.query.execute(
      new GetPermissionsAssignmentsQuery(body),
    );
    return this.successResponse(response.data);
  }
}
