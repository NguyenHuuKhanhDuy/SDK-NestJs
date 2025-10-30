import { GetUsersRequest } from './get-users.request';

export class GetUsersQuery {
  constructor(public readonly payload: GetUsersRequest) {}
}
