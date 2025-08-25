export class GetRoleDetailResponse {
  id: number;
  name: string;
  description: string;
  permissions: Record<string, boolean>;
}
