import { ResetPasswordRequest } from './reset-password.request';

export class ResetPasswordCommand {
  constructor(public readonly payload: ResetPasswordRequest) {}
}
