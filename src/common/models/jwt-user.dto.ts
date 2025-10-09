export class JwtUserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  permissions: string[];
  isSystemUser: boolean;
  sessionId: string;
  iat?: number;
  exp?: number;
}
