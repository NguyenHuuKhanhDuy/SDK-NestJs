import { Provider } from '@common/enum';

export class GetProfileResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  provider: Provider;
  createdAt: Date;
  countryId: number;
  isTwoFactorEnabled: boolean;

  constructor(partial?: Partial<GetProfileResponse>) {
    Object.assign(this, partial);
  }
}
