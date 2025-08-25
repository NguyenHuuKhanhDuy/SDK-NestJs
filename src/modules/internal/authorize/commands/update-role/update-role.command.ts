import { UpdateRoleRequest } from './update-role.request';

export class UpdateRoleCommand {
  constructor(public readonly payload: UpdateRoleRequest) {}
}
