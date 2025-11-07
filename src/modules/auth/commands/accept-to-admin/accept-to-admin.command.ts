import { AcceptToAdminRequest } from './accept-to-admin.request';

export class AcceptToAdminCommand {
  constructor(public readonly payload: AcceptToAdminRequest) {}
}
