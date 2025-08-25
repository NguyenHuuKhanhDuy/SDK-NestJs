import { GetRolesRequest } from './get-roles.request';

export class GetRolesQuery {
  constructor(public readonly payload: GetRolesRequest) {}
}
