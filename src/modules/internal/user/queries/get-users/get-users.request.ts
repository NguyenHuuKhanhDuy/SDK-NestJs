import { UserStatus } from '@common/enum';
import { PaginationQuery } from '@common/models';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetUsersRequest extends PaginationQuery {
  @ApiPropertyOptional({ enum: UserStatus, isArray: true })
  @IsOptional()
  status?: UserStatus[];

  @ApiPropertyOptional({ example: 'john.doe' })
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ example: 'john.doe' })
  @IsOptional()
  roleId?: number;
}
