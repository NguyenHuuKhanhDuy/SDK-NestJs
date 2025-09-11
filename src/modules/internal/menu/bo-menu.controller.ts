import { BaseController } from '@common/models';
import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import { GetMenusQuery } from './queries';

@Controller({ path: 'internal/menus', version: '1' })
@ApiTags('Menu')
export class BoMenuController extends BaseController {
  constructor(private readonly query: QueryBus) {
    super();
  }

  @Get()
  async getMenus() {
    const response = await this.query.execute(new GetMenusQuery());
    return this.successResponse(response.data);
  }
}
