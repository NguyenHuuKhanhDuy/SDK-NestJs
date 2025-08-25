import { AddRoleRequest } from '@internal/authorize/commands';

export class UpdateRoleRequest extends AddRoleRequest {
  roleId: number;
}
