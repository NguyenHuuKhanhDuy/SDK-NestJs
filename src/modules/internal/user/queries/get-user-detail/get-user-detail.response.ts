import { Provider, UserStatus } from '@common/enum';

export class GetUserDetailResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  provider: Provider;
  createdAt: Date;
  isConfirmed: boolean;
  status: UserStatus;
  countryId: number;
  updatedAt: Date;
  updatedBy: string;
  deletedAt: Date;
  deletedBy: string;

  constructor(partial?: Partial<GetUserDetailResponse>) {
    Object.assign(this, partial);
  }
}
