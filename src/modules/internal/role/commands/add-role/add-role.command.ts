import { AddRoleRequest } from './add-role.request';

export class AddRoleCommand {
  constructor(public readonly payload: AddRoleRequest) {}
}
