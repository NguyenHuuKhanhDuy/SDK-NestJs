import { BaseController } from '@common/models';
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import { AddRoleCommand, AddRoleRequest } from './commands';

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
}
