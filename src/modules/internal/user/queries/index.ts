import { GetUsersHandler } from './get-users/get-users.handler';

export const queryHandlers = [GetUsersHandler];

export * from './get-users/get-users.query';
export * from './get-users/get-users.request';
