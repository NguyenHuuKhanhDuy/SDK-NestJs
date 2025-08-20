import { GetPermissionsRequest } from './get-permissions.request';

export class GetPermissionsQuery {
  constructor(public readonly payload: GetPermissionsRequest) {}
}
