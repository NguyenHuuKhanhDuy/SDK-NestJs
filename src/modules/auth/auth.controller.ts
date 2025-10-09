import { Public } from '@core/decorator';
import { TranslateService } from '@core/services/i18n/i18n.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { CryptoJsHelper } from '@src/common/helper';
import { BaseController } from '@src/common/models';

import { LoginCommand, LoginRequest, LogoutCommand } from './commands';

@Controller({ path: 'auth' })
@ApiTags('Authentication')
export class AuthController extends BaseController {
  constructor(private readonly command: CommandBus) {
    super();
  }

  @Public()
  @Post('login')
  async login(@Body() body: LoginRequest) {
    const response = await this.command.execute(new LoginCommand(body));
    return this.successResponse(response);
  }

  @Post('logout')
  async logout() {
    await this.command.execute(new LogoutCommand());
    return this.successResponse(null);
  }

  @Public()
  @Post('encrypt')
  encrypt(@Body('text') text: string) {
    TranslateService.t('system.EXH.EXH_ERR_001');
    return CryptoJsHelper.encrypt(text);
  }

  @Public()
  @Post('decrypt')
  decrypt(@Body('text') text: string) {
    return CryptoJsHelper.decrypt(text);
  }
}
