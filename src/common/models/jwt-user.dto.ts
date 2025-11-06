export class JwtUserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  permissions: string[];
  isSuperAdmin: boolean;
  sessionId: string;
  iat?: number;
  exp?: number;
  test?: string;
}
