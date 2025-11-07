import { AcceptToAdminHandler } from './accept-to-admin/accept-to-admin.handler';
import { ForgotPasswordHandler } from './forgot-password/forgot-password.handler';
import { LoginHandler } from './login/login.handler';
import { RegisterHandler } from './register/register.handler';
import { ResetPasswordHandler } from './reset-password/reset-password.handler';
import { VerifyEmailHandler } from './verify-email/verify-email.handler';

export const commandHandlers = [
  LoginHandler,
  RegisterHandler,
  VerifyEmailHandler,
  ForgotPasswordHandler,
  ResetPasswordHandler,
  AcceptToAdminHandler,
];

export * from './accept-to-admin/accept-to-admin.command';
export * from './accept-to-admin/accept-to-admin.request';
export * from './forgot-password/forgot-password.command';
export * from './forgot-password/forgot-password.request';
export * from './login/login.command';
export * from './login/login.request';
export * from './register/register.command';
export * from './register/register.request';
export * from './reset-password/reset-password.command';
export * from './reset-password/reset-password.request';
export * from './verify-email/verify-email.command';
export * from './verify-email/verify-email.request';
