import { Pagination } from '@common/interface';
import { PaginationQuery, PagingDataDto, PagingDto } from '@common/models';
import { SelectQueryBuilder } from 'typeorm';

export class QueryHelper {
  static async toListAsPageAsync<T>(
    query: SelectQueryBuilder<any>,
    paginationQuery: PaginationQuery,
  ): Promise<PagingDataDto<T>> {
    const result = new PagingDataDto<T>();
    const pageNumber = Number(paginationQuery.pageNumber);
    const maxPerPage = Number(paginationQuery.maxPerPage);
    const pagingResponse: PagingDto = {
      maxPerPage,
      pageNumber,
      totalItem: 0,
      totalPage: 0,
    };

    const totalItem = await query.getCount();
    if (totalItem === 0) {
      result.paging = pagingResponse;
      result.data = [];
      return result;
    }

    pagingResponse.totalItem = totalItem;
    pagingResponse.totalPage = Math.ceil(totalItem / maxPerPage);

    const data = await query
      .offset((pageNumber - 1) * maxPerPage)
      .limit(maxPerPage)
      .getRawMany<T>();

    result.paging = pagingResponse;
    result.data = data;
    return result;
  }

  static ILikePattern(keyword: string) {
    return `%${keyword}%`;
  }

  static toString(columnName: string) {
    return `CAST(${columnName} AS TEXT)`;
  }

  static selectAs(field: string) {
    return `${field} AS ${field.replaceAll('.', '_')}`;
  }

  static selectAsArray(fields: string[]) {
    return fields.map((x) => this.selectAs(x));
  }

  static generatePagingOptions(paginationQuery: PaginationQuery) {
    return {
      skip: (paginationQuery.pageNumber - 1) * paginationQuery.maxPerPage,
      take: paginationQuery.maxPerPage,
    };
  }

  static calcPagination(
    queryDto: PaginationQuery,
    totalItem: number,
  ): Pagination {
    const paging = {
      maxPerPage: Number(queryDto.maxPerPage),
      pageNumber: Number(queryDto.pageNumber),
      totalItem: 0,
      totalPage: 0,
    };
    paging.totalItem = totalItem;
    paging.totalPage = Math.ceil(totalItem / paging.maxPerPage);

    return paging;
  }
}
