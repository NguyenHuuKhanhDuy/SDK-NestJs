import { TranslateService } from '@core/services/i18n/i18n.service';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ResetPasswordRequest {
  @ApiProperty({ example: 'john@gmail.com' })
  @IsNotEmpty({ message: TranslateService.key('business.FGP.FGP_ERR_004') })
  token: string;

  @ApiProperty({ example: 'NewPassword123!' })
  @IsNotEmpty({ message: TranslateService.key('business.FGP.FGP_ERR_005') })
  readonly password: string;
}
