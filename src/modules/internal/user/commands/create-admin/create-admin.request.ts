import { Max, Regex } from '@common/constant';
import { TranslateService } from '@core/services/i18n/i18n.service';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MaxLength } from 'class-validator';

export class CreateAdminRequest {
  @ApiProperty({ example: 'john' })
  @IsNotEmpty({ message: TranslateService.key('internal.USER.USER_ERR_002') })
  @MaxLength(Max.FirstName, {
    message: TranslateService.key('internal.USER.USER_ERR_006'),
    context: {
      params: {
        max: Max.FirstName,
      },
    },
  })
  firstName: string;

  @ApiProperty({ example: 'john' })
  @IsNotEmpty({ message: TranslateService.key('internal.USER.USER_ERR_003') })
  @MaxLength(Max.LastName, {
    message: TranslateService.key('internal.USER.USER_ERR_007'),
    context: {
      params: {
        max: Max.LastName,
      },
    },
  })
  lastName: string;

  @ApiProperty({ example: 'john@gmail.com' })
  @IsNotEmpty({
    message: TranslateService.key('internal.USER.USER_ERR_013'),
  })
  @Matches(Regex.Email, {
    message: TranslateService.key('internal.USER.USER_ERR_005'),
  })
  @MaxLength(Max.Email, {
    message: TranslateService.key('internal.USER.USER_ERR_008'),
    context: {
      params: {
        max: Max.Email,
      },
    },
  })
  email: string;

  @ApiProperty({ example: 'P@ssw0rd!' })
  @IsNotEmpty({
    message: TranslateService.key('internal.USER.USER_ERR_014'),
  })
  password: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty({
    message: TranslateService.key('internal.USER.USER_ERR_004'),
  })
  countryId: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty({
    message: TranslateService.key('internal.USER.USER_ERR_015'),
  })
  roleId: number;
}
