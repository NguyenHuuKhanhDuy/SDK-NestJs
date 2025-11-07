import { ChangePasswordRequest } from './change-password.request';

export class ChangePasswordCommand {
  constructor(public readonly payload: ChangePasswordRequest) {}
}
