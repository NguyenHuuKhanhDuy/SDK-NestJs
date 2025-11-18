import { Site } from '@common/enum';
import { BaseController } from '@common/models';
import { RateLimit } from '@core/services/rate-limit';
import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import {
  ChangePasswordCommand,
  ChangePasswordRequest,
  LogoutCommand,
  Setup2faCommand,
  Toggle2faCommand,
  Toggle2faRequest,
} from './commands';
import { GetPermissionsQuery, GetProfileQuery } from './queris';

@Controller('users')
@ApiTags('User')
export class UserController extends BaseController {
  constructor(
    private readonly query: QueryBus,
    private readonly command: CommandBus,
  ) {
    super();
  }

  @Post('logout')
  async logout() {
    await this.command.execute(new LogoutCommand());
    return this.successResponse(null);
  }

  @Put('change-password')
  async changePassword(@Body() body: ChangePasswordRequest) {
    await this.command.execute(new ChangePasswordCommand(body));
    return this.successResponse(null);
  }

  @Get('me')
  async getProfile() {
    const response = await this.query.execute(new GetProfileQuery(Site.User));
    return this.successResponse(response);
  }

  @Get('admin/me')
  async getProfileAdmin() {
    const response = await this.query.execute(new GetProfileQuery(Site.Admin));
    return this.successResponse(response);
  }

  @Get('admin/permissions')
  async getPermissionsAdmin() {
    const response = await this.query.execute(new GetPermissionsQuery());
    return this.successResponse(response);
  }

  @RateLimit('short')
  @Post('setup-2fa')
  async setup2fa() {
    const response = await this.command.execute(new Setup2faCommand());
    return this.successResponse(response);
  }

  @RateLimit('short')
  @Post('toggle-2fa')
  async verify2fa(@Body() body: Toggle2faRequest) {
    await this.command.execute(new Toggle2faCommand(body));
    return this.successResponse(null);
  }
}
