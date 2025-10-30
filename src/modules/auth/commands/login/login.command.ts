import { Site } from '@common/enum';

import { LoginRequest } from './login.request';

export class LoginCommand {
  constructor(
    public payload: LoginRequest,
    public site: Site,
  ) {}
}
