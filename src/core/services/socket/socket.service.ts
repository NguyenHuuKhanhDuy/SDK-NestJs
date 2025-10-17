import { LoggerService } from '@core/services/logger';
import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class SocketService {
  constructor(private readonly logger: LoggerService) {}

  private server: Server;

  // Each user has a set of sockets and a map to track connection time
  private userConnections = new Map<
    string,
    { sockets: Set<string>; connectedAt: Map<string, number> }
  >();

  // Maximum number of devices allowed per user
  private readonly MAX_DEVICES_PER_USER = 3;

  setServer(server: Server) {
    this.server = server;
  }

  /**
   * Add a new socket connection for the user.
   * If the user exceeds the device limit, disconnect the oldest one.
   */
  addClient(userId: string, socketId: string) {
    if (!this.userConnections.has(userId)) {
      this.userConnections.set(userId, {
        sockets: new Set(),
        connectedAt: new Map(),
      });
    }

    const userData = this.userConnections.get(userId);

    // Disconnect the oldest device if the limit is exceeded
    if (userData.sockets.size >= this.MAX_DEVICES_PER_USER) {
      const oldestSocketId = [...userData.connectedAt.entries()].sort(
        (a, b) => a[1] - b[1],
      )[0][0];

      this.logger.warn(
        `User ${userId} exceeded device limit (${this.MAX_DEVICES_PER_USER}). Disconnecting ${oldestSocketId}`,
      );

      this.server.sockets.sockets.get(oldestSocketId)?.disconnect(true);
      userData.sockets.delete(oldestSocketId);
      userData.connectedAt.delete(oldestSocketId);
    }

    userData.sockets.add(socketId);
    userData.connectedAt.set(socketId, Date.now());

    this.logger.log(`User ${userId} added socket ${socketId}`);
  }

  /**
   * Remove a socket when a user disconnects.
   */
  removeClient(socketId: string) {
    for (const [userId, userData] of this.userConnections.entries()) {
      if (userData.sockets.has(socketId)) {
        userData.sockets.delete(socketId);
        userData.connectedAt.delete(socketId);

        if (userData.sockets.size === 0) {
          this.userConnections.delete(userId);
        }

        this.logger.log(`User ${userId} disconnected socket ${socketId}`);
        break;
      }
    }
  }

  /**
   * Emit an event to all devices of a specific user.
   */
  emitToUser(userId: string, event: string, data: any) {
    const userData = this.userConnections.get(userId);
    if (!userData) {
      return;
    }

    for (const socketId of userData.sockets) {
      this.server.to(socketId).emit(event, data);
    }

    this.logger.debug(
      `Emit "${event}" to user ${userId} (${userData.sockets.size} device(s))`,
    );
  }

  emitToUserSocket(userId: string, socketId: string, event: string, data: any) {
    const userData = this.userConnections.get(userId);
    if (!userData || !userData.sockets.has(socketId)) {
      return;
    }

    this.server.to(socketId).emit(event, data);

    this.logger.debug(
      `Emit "${event}" to user ${userId} on socket ${socketId}`,
    );
  }

  /**
   * Broadcast an event to all connected users.
   */
  broadcast(event: string, data: any) {
    if (!this.server) {
      return;
    }
    this.server.emit(event, data);
  }

  /**
   * Get a list of online users.
   */
  getOnlineUsers() {
    return [...this.userConnections.keys()];
  }
}
