import { UserStatus } from '@common/enum';
import { PagingDto } from '@common/models';

export class GetUsersResponse {
  paging: PagingDto;
  data: GetUsersData[] = [];
}

export class GetUsersData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  isSuperAdmin: boolean;
  status: UserStatus;
  isConfirmed: boolean;

  constructor(partials?: Partial<GetUsersData>) {
    Object.assign(this, partials);
  }
}
