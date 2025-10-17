import { CommonException } from '@common/exceptions';
import { JwtUserDto } from '@common/models';
import { JwtTokenService } from '@core/services/jwt';
import { SocketAuthGuard } from '@core/services/jwt/socket-auth.guard';
import { LoggerService } from '@core/services/logger';
import { RedisService } from '@core/services/redis';
import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { SocketService } from './socket.service';

@WebSocketGateway({
  cors: { origin: '*' },
})
@UseGuards(SocketAuthGuard)
export class SocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly socketService: SocketService,
    private readonly jwtService: JwtTokenService,
    private readonly redisService: RedisService,
    private readonly logger: LoggerService,
  ) {}

  /**
   * Called once after the gateway is initialized.
   * Here we assign the Socket.IO server to the service for global usage.
   */
  afterInit(server: Server) {
    this.socketService.setServer(server);
    this.logger.log('⚡ Socket gateway initialized');
  }

  /**
   * Triggered when a client connects to the socket server.
   * Validate JWT token, check Redis session, and register the user connection.
   */
  async handleConnection(client: Socket) {
    try {
      const token =
        client.handshake?.auth?.token ||
        client.handshake?.headers?.authorization?.split(' ')[1];

      if (!token) {
        throw CommonException.Unauthorized('business.AUTH.AUTH_ERR_001');
      }

      // Verify JWT token
      const user: JwtUserDto = this.jwtService.verify(token);

      // Check session validity in Redis
      const isSessionValid = await this.redisService.isSessionValid(
        user.id,
        user.sessionId,
      );
      if (!isSessionValid) {
        throw CommonException.Unauthorized('business.AUTH.AUTH_ERR_002');
      }

      // Register client connection
      this.socketService.addClient(user.id, client.id);
      client.data.user = user; // store user info for later use

      this.logger.log(`✅ User ${user.id} connected (${client.id})`);
    } catch (err) {
      this.logger.warn(`❌ Unauthorized socket: ${err.message}`);
      client.disconnect(true);
    }
  }

  /**
   * Triggered when a client disconnects from the socket server.
   */
  handleDisconnect(client: Socket) {
    this.socketService.removeClient(client.id);
    this.logger.log(`🔌 Client disconnected: ${client.id}`);
  }

  /**
   * Sample message handler for 'ping' event.
   * Returns a 'pong' response to confirm connectivity.
   */
  @SubscribeMessage('ping')
  handlePing(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): void {
    const user = client.data.user;
    this.socketService.emitToUserSocket(user.id, client.id, 'pong', 'pong');
  }
}
