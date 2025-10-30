import { Provider, Site } from '@common/enum';
import { Public } from '@core/decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { CryptoJsHelper } from '@src/common/helper';
import { BaseController } from '@src/common/models';

import {
  ChangePasswordCommand,
  ChangePasswordRequest,
  ForgotPasswordCommand,
  ForgotPasswordRequest,
  LoginCommand,
  LoginRequest,
  LogoutCommand,
  RegisterCommand,
  RegisterRequest,
  ResetPasswordCommand,
  ResetPasswordRequest,
  VerifyEmailCommand,
  VerifyEmailRequest,
} from './commands';

@Controller({ path: 'auth' })
@ApiTags('Authentication')
export class AuthController extends BaseController {
  constructor(private readonly command: CommandBus) {
    super();
  }

  @Public()
  @Post('login')
  async login(@Body() body: LoginRequest) {
    const response = await this.command.execute(
      new LoginCommand(body, Site.User),
    );
    return this.successResponse(response);
  }

  @Public()
  @Post('admin/login')
  async adminLogin(@Body() body: LoginRequest) {
    const response = await this.command.execute(
      new LoginCommand(body, Site.Admin),
    );
    return this.successResponse(response);
  }

  @Public()
  @Post('register')
  async register(@Body() body: RegisterRequest) {
    await this.command.execute(new RegisterCommand(body, Provider.Manual));
    return this.successResponse(null);
  }

  @Public()
  @Post('verify-email')
  async verifyEmail(@Body() body: VerifyEmailRequest) {
    await this.command.execute(new VerifyEmailCommand(body));
    return this.successResponse(null);
  }

  @Public()
  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordRequest) {
    await this.command.execute(new ForgotPasswordCommand(body));
    return this.successResponse(null);
  }

  @Public()
  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordRequest) {
    await this.command.execute(new ResetPasswordCommand(body));
    return this.successResponse(null);
  }

  @Post('logout')
  async logout() {
    await this.command.execute(new LogoutCommand());
    return this.successResponse(null);
  }

  @Post('change-password')
  async changePassword(@Body() body: ChangePasswordRequest) {
    await this.command.execute(new ChangePasswordCommand(body));
    return this.successResponse(null);
  }

  @Public()
  @Post('encrypt')
  encrypt(@Body('text') text: string) {
    return CryptoJsHelper.encrypt(text);
  }

  @Public()
  @Post('decrypt')
  decrypt(@Body('text') text: string) {
    return CryptoJsHelper.decrypt(text);
  }
}
