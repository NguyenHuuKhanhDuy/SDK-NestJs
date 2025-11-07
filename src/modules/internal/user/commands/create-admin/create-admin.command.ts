import { CreateAdminRequest } from './create-admin.request';

export class CreateAdminCommand {
  constructor(public readonly payload: CreateAdminRequest) {}
}
