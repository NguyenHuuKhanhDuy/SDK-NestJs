export type Pagination = {
  maxPerPage: number;
  pageNumber: number;
  totalItem: number;
  totalPage: number;
};

export interface ISuccessResponse<T> extends IResponse<T> {
  data: T;
  success: boolean;
}

export interface ISuccessResponsePaginate<T> extends IResponse<T> {
  data: T;
  paging: Pagination;
  success: boolean;
}

export type CursorPagination = {
  hasNextPage: boolean;
  startCursor: string;
  endCursor: string;
  totalCount: number;
};

export interface ISuccessCursorPaginate<T> {
  data: T;
  paging: CursorPagination;
}

export interface ISuccessResponseCursorPaginate<T> {
  data: T;
  pageInfo: CursorPagination;
  success: boolean;
}

export interface IResponse<T> {
  data: T;
  success: boolean;
}

export interface IErrorResponse<T> extends IResponse<T> {
  errorMessage: string;
  errorMessageCode: string;
}
