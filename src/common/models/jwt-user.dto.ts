export class JwtUserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roleId: number;
  permissions: string[];
  isSuperAdmin: boolean;
  sessionId: string;
  iat?: number;
  exp?: number;
}
