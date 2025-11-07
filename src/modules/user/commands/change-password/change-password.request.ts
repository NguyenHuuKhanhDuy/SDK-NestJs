import { TranslateService } from '@core/services/i18n/i18n.service';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ChangePasswordRequest {
  @ApiProperty({ example: 'OldPassword123!' })
  @IsNotEmpty({ message: TranslateService.key('business.CHP.CHP_ERR_004') })
  readonly oldPassword: string;

  @ApiProperty({ example: 'NewPassword123!' })
  @IsNotEmpty({ message: TranslateService.key('business.CHP.CHP_ERR_005') })
  readonly newPassword: string;
}
