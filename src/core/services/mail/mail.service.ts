import { EnvKey } from '@common/constant';
import { LoggerService } from '@core/services/logger';
import { Injectable } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';
import { ConfigEnvironmentService } from '@src/configs/config-environment.base.service';

@Injectable()
export class MailService {
  private emailSender: string;
  constructor(private readonly logger: LoggerService) {
    const apiKey = ConfigEnvironmentService.getIns().get(
      EnvKey.SendGrid.ApiKey,
    );
    if (!apiKey) {
      return;
    }

    SendGrid.setApiKey(apiKey);
    this.emailSender = ConfigEnvironmentService.getIns().get(
      EnvKey.SendGrid.Email,
    );
  }

  async send(mail: SendGrid.MailDataRequired) {
    return await SendGrid.send(mail);
  }
}
