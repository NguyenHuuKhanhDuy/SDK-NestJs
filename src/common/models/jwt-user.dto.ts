export class JwtUserDto {
  id: string;
  email: string;
  roles: string[];
  permissions: string[];
  isSystemUser: boolean;
  iat?: number;
  exp?: number;
}
