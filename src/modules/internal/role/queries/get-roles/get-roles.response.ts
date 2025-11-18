import { RoleType } from '@common/enum';
import { PagingDto } from '@common/models';

export class GetRolesResponse {
  data: GetRolesData[];
  paging: PagingDto;
}
export class GetRolesData {
  id: number;
  name: string;
  description: string;
  type: RoleType;
  users: string[];

  constructor(partials?: Partial<GetRolesData>) {
    Object.assign(this, partials);
  }
}
