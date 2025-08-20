export class GetPermissionsResponse {
  data: GetPermissionsResponseItem[] = [];
}

export class GetPermissionsResponseItem {
  menuKey: string;
  permissions: string[];

  constructor(partial?: Partial<GetPermissionsResponseItem>) {
    Object.assign(this, partial);
  }
}
