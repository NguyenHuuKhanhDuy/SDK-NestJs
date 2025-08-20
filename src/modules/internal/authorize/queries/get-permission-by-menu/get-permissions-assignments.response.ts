export class GetPermissionsAssignmentsResponse {
  data: GetPermissionByMenuItem[];
}

export class GetPermissionByMenuItem {
  id: string;
  name: string;
  permissions: GetPermissionByMenuPermission[];

  constructor(partial?: Partial<GetPermissionByMenuItem>) {
    Object.assign(this, partial);
  }
}

export class GetPermissionByMenuPermission {
  id: string;
  name: string;
  assigned: boolean;

  constructor(partial?: Partial<GetPermissionByMenuPermission>) {
    Object.assign(this, partial);
  }
}
