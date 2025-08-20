import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwt: NestJwtService) {}

  sign(
    payload: Record<string, any>,
    expiresIn: string | number = '1h',
  ): string {
    return this.jwt.sign(payload, { expiresIn });
  }

  verify<T extends object = any>(token: string): T {
    return this.jwt.verify<T>(token);
  }

  decode<T extends object = any>(token: string): T | null {
    return this.jwt.decode(token) as T | null;
  }
}
