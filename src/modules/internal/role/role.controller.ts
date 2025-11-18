import { BaseController } from '@common/models';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import {
  AddRoleCommand,
  AddRoleRequest,
  DeleteRoleCommand,
  UpdateRoleCommand,
  UpdateRoleRequest,
} from './commands';
import { GetRoleDetailQuery, GetRolesQuery, GetRolesRequest } from './queries';

@Controller({ path: 'internal/roles', version: '1' })
@ApiTags('Role')
export class RoleController extends BaseController {
  constructor(
    private readonly query: QueryBus,
    private readonly command: CommandBus,
  ) {
    super();
  }

  @Post()
  async addRoles(@Body() body: AddRoleRequest) {
    await this.command.execute(new AddRoleCommand(body));
    return this.successResponse(null);
  }

  @Post('all')
  async getRoles(@Body() body: GetRolesRequest) {
    const response = await this.query.execute(new GetRolesQuery(body));
    return this.pagingResponse(response.data, response.paging);
  }

  @Get(':id')
  async getRoleDetail(@Param('id') id: number) {
    const response = await this.query.execute(new GetRoleDetailQuery(id));
    return this.successResponse(response);
  }

  @Delete(':id')
  async deleteRole(@Param('id') id: number) {
    await this.command.execute(new DeleteRoleCommand(id));
    return this.successResponse(null);
  }

  @Put(':id')
  async updateRole(@Body() body: UpdateRoleRequest, @Param('id') id: number) {
    body.id = id;
    await this.command.execute(new UpdateRoleCommand(body));
    return this.successResponse(null);
  }
}
