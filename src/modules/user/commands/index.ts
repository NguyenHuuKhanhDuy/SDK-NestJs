import { ChangePasswordHandler } from './change-password/change-password.handler';
import { LogoutHandler } from './logout/logout.handler';

export const commandHandlers = [LogoutHandler, ChangePasswordHandler];

export * from './change-password/change-password.command';
export * from './change-password/change-password.request';
export * from './logout/logout.command';
