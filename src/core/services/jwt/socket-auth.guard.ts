import { JwtTokenService } from '@core/services/jwt/jwt.service';
import { RedisService } from '@core/services/redis';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { CommonException } from '@src/common/exceptions';
import { JwtUserDto } from '@src/common/models';
import { Socket } from 'socket.io';

@Injectable()
export class SocketAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtTokenService,
    private readonly redisService: RedisService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: Socket = context.switchToWs().getClient();
    const token =
      client.handshake?.auth?.token ||
      client.handshake?.headers?.authorization?.split(' ')[1];

    if (!token) {
      throw CommonException.Unauthorized('business.AUTH.AUTH_ERR_001');
    }

    let user: JwtUserDto;
    try {
      user = this.jwtService.verify(token);
    } catch {
      throw CommonException.Unauthorized('business.AUTH.AUTH_ERR_002');
    }

    // ✅ Kiểm tra session trong Redis
    const isSessionValid = await this.redisService.isSessionValid(
      user.id,
      user.sessionId,
    );
    if (!isSessionValid) {
      throw CommonException.Unauthorized('business.AUTH.AUTH_ERR_002');
    }

    // ✅ Gán user vào context Socket (có thể lấy trong Gateway)
    client.data.user = user;

    return true;
  }
}
