import { HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import {
  CursorPagination,
  IErrorResponse,
  ISuccessResponse,
  ISuccessResponseCursorPaginate,
  ISuccessResponsePaginate,
  Pagination,
} from '@src/common/interface/base.interface';

export class BaseController {
  @HttpCode(HttpStatus.OK)
  protected successResponse<T>(data?: T): ISuccessResponse<T> {
    return {
      success: true,
      data: data ?? null,
    };
  }

  errorResponse<T>(error: HttpException): IErrorResponse<T> {
    throw error;
  }

  pagingResponse<T>(data: T, paging: Pagination): ISuccessResponsePaginate<T> {
    return {
      success: true,
      data,
      paging,
    };
  }

  cursorPagingResponse<T>(
    data: T,
    pageInfo: CursorPagination,
  ): ISuccessResponseCursorPaginate<T> {
    return {
      success: true,
      data,
      pageInfo,
    };
  }
}
