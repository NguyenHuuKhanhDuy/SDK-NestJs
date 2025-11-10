import { Max, Regex } from '@common/constant';
import { TranslateService } from '@core/services/i18n/i18n.service';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class Reset2faByRecoveryCodeRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  recoveryCode: string;

  @ApiProperty({ example: 'john@gmail.com' })
  @IsNotEmpty()
  @Matches(Regex.Email, {
    message: TranslateService.key('business.2FA.2FA_ERR_006'),
  })
  @MaxLength(Max.Email, {
    message: TranslateService.key('business.2FA.2FA_ERR_007'),
    context: {
      params: {
        max: Max.Email,
      },
    },
  })
  readonly email: string;
}
