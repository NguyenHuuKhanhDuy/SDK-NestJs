import { ForgotPasswordRequest } from './forgot-password.request';

export class ForgotPasswordCommand {
  constructor(public readonly payload: ForgotPasswordRequest) {}
}
