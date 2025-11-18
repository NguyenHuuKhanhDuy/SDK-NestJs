import { TranslateService } from '@core/services/i18n/i18n.service';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class Toggle2faRequest {
  @ApiProperty({ example: '123456' })
  @IsNotEmpty({ message: TranslateService.key('business.2FA.2FA_ERR_001') })
  code: string;

  @IsNotEmpty()
  @IsBoolean()
  isEnable: boolean;
}
