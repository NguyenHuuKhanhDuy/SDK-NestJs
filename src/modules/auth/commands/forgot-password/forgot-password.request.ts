import { Max, Regex } from '@common/constant';
import { TranslateService } from '@core/services/i18n/i18n.service';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MaxLength } from 'class-validator';

export class ForgotPasswordRequest {
  @ApiProperty({ example: 'john@gmail.com' })
  @IsNotEmpty({ message: TranslateService.key('business.FGP.FGP_ERR_001') })
  @Matches(Regex.Email, {
    message: TranslateService.key('business.FGP.FGP_ERR_003'),
  })
  @MaxLength(Max.Email, {
    message: TranslateService.key('business.FGP.FGP_ERR_008'),
    context: {
      params: {
        max: Max.Email,
      },
    },
  })
  readonly email: string;
}
