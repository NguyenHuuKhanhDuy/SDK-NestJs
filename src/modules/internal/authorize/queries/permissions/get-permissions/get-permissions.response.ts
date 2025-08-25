export class GetPermissionsResponse {
  data: GetPermissionsData[] = [];
}

export class GetPermissionsData {
  id: string;
  name: string;
  description: string;
  permissions: GetPermissionsItem[] = [];
  children: GetPermissionsData[] = [];

  constructor(partial?: Partial<GetPermissionsData>) {
    Object.assign(this, partial);
  }
}

export class GetPermissionsItem {
  id: string;
  name: string;
  description: string;

  constructor(partial?: Partial<GetPermissionsItem>) {
    Object.assign(this, partial);
  }
}
