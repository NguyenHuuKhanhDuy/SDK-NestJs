import { GetUserDetailHandler } from './get-user-detail/get-user-detail.handler';
import { GetUsersHandler } from './get-users/get-users.handler';

export const queryHandlers = [GetUsersHandler, GetUserDetailHandler];

export * from './get-user-detail/get-user-detail.query';
export * from './get-users/get-users.query';
export * from './get-users/get-users.request';
