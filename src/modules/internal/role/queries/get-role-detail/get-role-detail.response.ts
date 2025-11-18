export class GetRoleDetailResponse {
  id: number;
  name: string;
  description: string;
  permissionIds: string[];

  constructor(partial?: Partial<GetRoleDetailResponse>) {
    Object.assign(this, partial);
  }
}
