import { StringHelper } from '@common/helper';
import { RedisConstant } from '@core/services/redis/redis.constants';
import { Injectable } from '@nestjs/common';

import { BaseRedisService } from './base-redis.service';

@Injectable()
export class RedisService {
  constructor(private readonly redis: BaseRedisService) {}

  /**
   * Create a new session record for a user.
   * Stores lightweight session info (not the token itself).
   */
  async createSession(
    userId: string,
    sessionId: string,
    sessionData: string,
    ttlSeconds: number,
  ): Promise<void> {
    const key = StringHelper.format(
      RedisConstant.Key.Session,
      userId,
      sessionId,
    );
    await this.redis.set(key, sessionData, ttlSeconds);
  }

  /**
   * Check whether a given session is still valid (exists in Redis).
   */
  async isSessionValid(userId: string, sessionId: string): Promise<boolean> {
    const key = StringHelper.format(
      RedisConstant.Key.Session,
      userId,
      sessionId,
    );
    const exists = await this.redis.get(key);
    return !!exists;
  }

  /**
   * Retrieve the stored session information (optional).
   */
  async getSession(userId: string, sessionId: string): Promise<string | null> {
    const key = StringHelper.format(
      RedisConstant.Key.Session,
      userId,
      sessionId,
    );
    return await this.redis.get<string>(key);
  }

  /**
   * Remove a specific session (logout a single device).
   */
  async removeSession(userId: string, sessionId: string): Promise<void> {
    const key = StringHelper.format(
      RedisConstant.Key.Session,
      userId,
      sessionId,
    );
    await this.redis.del(key);
  }

  /**
   * Remove all sessions belonging to a user (logout from all devices).
   */
  async removeAllSessions(userId: string): Promise<void> {
    const key = StringHelper.format(RedisConstant.Key.Session, userId, '*');
    const client = (this.redis as any).client;
    const keys = await client.keys(key);
    if (keys.length > 0) {
      await client.del(keys);
    }
  }
}
