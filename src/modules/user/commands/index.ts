import { Toggle2faHandler } from '@modules/user/commands/toggle-2fa/toggle-2fa.handler';

import { ChangePasswordHandler } from './change-password/change-password.handler';
import { LogoutHandler } from './logout/logout.handler';
import { Setup2faHandler } from './setup-2fa/setup-2fa.handler';

export const commandHandlers = [
  LogoutHandler,
  ChangePasswordHandler,
  Setup2faHandler,
  Toggle2faHandler,
];

export * from './change-password/change-password.command';
export * from './change-password/change-password.request';
export * from './logout/logout.command';
export * from './setup-2fa/setup-2fa.command';
export * from '@modules/user/commands/toggle-2fa/toggle-2fa.command';
export * from '@modules/user/commands/toggle-2fa/toggle-2fa.request';
