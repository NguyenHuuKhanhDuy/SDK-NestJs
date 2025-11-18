import { GetPermissionsHandler } from './get-permissions/get-permissions.handler';
import { GetProfileHandler } from './get-profile/get-profile.handler';

export const queryHandlers = [GetProfileHandler, GetPermissionsHandler];

export * from './get-permissions/get-permissions.query';
export * from './get-profile/get-profile.query';
