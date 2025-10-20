import { VerifyEmailRequest } from './verify-email.request';

export class VerifyEmailCommand {
  constructor(public readonly payload: VerifyEmailRequest) {}
}
