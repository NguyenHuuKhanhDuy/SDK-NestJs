import { IS_PUBLIC_KEY, PERMISSIONS_KEY } from '@core/decorator';
import { JwtTokenService } from '@core/services/jwt/jwt.service';
import { RedisService } from '@core/services/redis';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CommonException } from '@src/common/exceptions';
import { JwtUserDto } from '@src/common/models';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtTokenService,
    private redisService: RedisService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw CommonException.Unauthorized('business.AUTH.AUTH_ERR_001');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw CommonException.Unauthorized('business.AUTH.AUTH_ERR_001');
    }

    let user: JwtUserDto;
    try {
      user = this.jwtService.verify(token);
    } catch {
      throw CommonException.Unauthorized('business.AUTH.AUTH_ERR_002');
    }

    // Check if session is valid
    const isSessionValid = await this.redisService.isSessionValid(
      user.id,
      user.sessionId,
    );
    if (!isSessionValid) {
      throw CommonException.Unauthorized('business.AUTH.AUTH_ERR_002');
    }

    request.user = user;
    if (user.isSystemUser) {
      return true;
    }

    // Check permissions
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true;
    }

    const userPermissions = user.permissions || [];
    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );
    if (!hasPermission) {
      throw CommonException.Forbidden('business.AUTH.AUTH_ERR_003');
    }

    return true;
  }
}
