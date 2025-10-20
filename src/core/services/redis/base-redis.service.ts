import { JsonHelper } from '@common/helper';
import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class BaseRedisService implements OnModuleDestroy {
  private readonly logger = new Logger(BaseRedisService.name);
  private isClientAlive = true;

  constructor(@InjectRedis() private readonly client: Redis) {
    // Handle Redis connection events
    this.client.on('error', (err) => {
      this.isClientAlive = false;
      this.logger.error(`Redis connection error: ${err.message}`);
    });

    this.client.on('connect', () => {
      this.isClientAlive = true;
      this.logger.log('✅ Redis connected');
    });

    this.client.on('end', () => {
      this.isClientAlive = false;
      this.logger.warn('⚠️ Redis connection closed');
    });
  }

  /**
   * Generic setter with optional TTL.
   */
  async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    if (!this.isClientAlive) {
      this.logger.warn(`[set] Redis not available, skip key=${key}`);
      return;
    }

    try {
      const serialized = JsonHelper.serialize(value);
      if (ttlSeconds && ttlSeconds > 0) {
        await this.client.set(key, serialized, 'EX', ttlSeconds);
      } else {
        await this.client.set(key, serialized);
      }
    } catch (err) {
      this.logger.error(`[set] Failed for key=${key}: ${err.message}`);
    }
  }

  /**
   * Generic getter and auto JSON parse.
   */
  async get<T>(key: string): Promise<T | null> {
    if (!this.isClientAlive) {
      return null;
    }

    try {
      const value = await this.client.get(key);
      if (!value) {
        return null;
      }
      return JSON.parse(value) as T;
    } catch (err) {
      this.logger.error(`[get] Failed for key=${key}: ${err.message}`);
      return null;
    }
  }

  /**
   * Delete key safely.
   */
  async del(key: string): Promise<number> {
    if (!this.isClientAlive) {
      return 0;
    }

    try {
      return await this.client.del(key);
    } catch (err) {
      this.logger.error(`[del] Failed for key=${key}: ${err.message}`);
      return 0;
    }
  }

  /**
   * Hash set field safely.
   */
  async hset(key: string, field: string, value: unknown): Promise<void> {
    if (!this.isClientAlive) {
      return;
    }

    try {
      await this.client.hset(key, field, JsonHelper.serialize(value));
    } catch (err) {
      this.logger.error(
        `[hset] Failed for key=${key}, field=${field}: ${err.message}`,
      );
    }
  }

  /**
   * Hash get single field and auto parse.
   */
  async hget<T>(key: string, field: string): Promise<T | null> {
    if (!this.isClientAlive) {
      return null;
    }

    try {
      const value = await this.client.hget(key, field);
      return value ? JSON.parse(value) : null;
    } catch (err) {
      this.logger.error(
        `[hget] Failed for key=${key}, field=${field}: ${err.message}`,
      );
      return null;
    }
  }

  /**
   * Hash get all fields (stringified values).
   */
  async hgetall(key: string): Promise<Record<string, string>> {
    if (!this.isClientAlive) {
      return {};
    }

    try {
      return await this.client.hgetall(key);
    } catch (err) {
      this.logger.error(`[hgetall] Failed for key=${key}: ${err.message}`);
      return {};
    }
  }

  /**
   * Set TTL for key.
   */
  async expire(key: string, seconds: number): Promise<boolean> {
    if (!this.isClientAlive) {
      return false;
    }

    try {
      const result = await this.client.expire(key, seconds);
      return result === 1;
    } catch (err) {
      this.logger.error(`[expire] Failed for key=${key}: ${err.message}`);
      return false;
    }
  }

  /**
   * Graceful shutdown.
   */
  async onModuleDestroy(): Promise<void> {
    try {
      this.logger.log('🔻 Closing Redis connection...');
      await this.client.quit();
      this.logger.log('✅ Redis connection closed gracefully');
    } catch (err) {
      this.logger.error(`Failed to close Redis connection: ${err.message}`);
      await this.client.disconnect();
    }
  }
}
