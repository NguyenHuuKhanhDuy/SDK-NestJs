import { Provider } from '@common/enum';

import { RegisterRequest } from './register.request';

export class RegisterCommand {
  constructor(
    public readonly payload: RegisterRequest,
    public readonly provider: Provider,
  ) {}
}
