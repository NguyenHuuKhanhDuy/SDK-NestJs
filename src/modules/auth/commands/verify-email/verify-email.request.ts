import { TranslateService } from '@core/services/i18n/i18n.service';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class VerifyEmailRequest {
  @ApiProperty({ example: 'some-verification-token' })
  @IsNotEmpty({ message: TranslateService.key('business.VRE.VRE_ERR_004') })
  token: string;
}
