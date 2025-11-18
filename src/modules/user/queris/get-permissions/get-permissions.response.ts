import { RoleType } from '@common/enum';

export class GetPermissionsResponse {
  permissions: string[];
  roleType: RoleType;
}
