import { Verify2faRequest } from './verify-2fa.request';

export class Verify2faCommand {
  constructor(public readonly payload: Verify2faRequest) {}
}
