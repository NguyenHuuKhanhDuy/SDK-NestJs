import { Reset2faByRecoveryCodeRequest } from './reset-2fa-by-recovery-code.request';

export class Reset2faByRecoveryCodeCommand {
  constructor(public readonly payload: Reset2faByRecoveryCodeRequest) {}
}
