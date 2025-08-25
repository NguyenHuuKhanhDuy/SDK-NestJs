import { GetRoleDetailHandler } from './get-role-detail/get-role-detail.handler';
import { GetRolesHandler } from './get-roles/get-roles.handler';

export const roleHandlers = [GetRoleDetailHandler, GetRolesHandler];
export * from './get-role-detail/get-role-detail.query';
export * from './get-roles/get-roles.query';
export * from './get-roles/get-roles.request';
