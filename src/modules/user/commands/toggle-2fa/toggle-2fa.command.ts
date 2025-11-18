import { Toggle2faRequest } from './toggle-2fa.request';

export class Toggle2faCommand {
  constructor(public readonly payload: Toggle2faRequest) {}
}
