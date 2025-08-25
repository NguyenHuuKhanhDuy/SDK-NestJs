import { PagingDto } from '@common/models';

export class GetRolesResponse {
  data: GetRolesData[];
  paging: PagingDto;
}

export class GetRolesData {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  users: GetRolesUserData[];

  constructor(partial?: Partial<GetRolesData>) {
    Object.assign(this, partial);
  }
}

export class GetRolesUserData {
  id: string;
  name: string;

  constructor(partial?: Partial<GetRolesUserData>) {
    Object.assign(this, partial);
  }
}
