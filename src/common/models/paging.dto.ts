import { Pagination } from '@common/interface';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class PagingDataDto<T> {
  data: T[];
  paging: PagingDto;
}

export class PagingDto implements Pagination {
  maxPerPage: number;
  pageNumber: number;
  totalItem: number;
  totalPage: number;
}

export class PaginationQuery {
  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  pageNumber?: number = 1;

  @ApiPropertyOptional({ default: 10 })
  @IsOptional()
  maxPerPage?: number = 10;
}
