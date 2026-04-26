import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis, { RedisOptions } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;
  private readonly logger = new Logger(RedisService.name);

  constructor(private configService: ConfigService) {
    // Coolify provides REDIS_URL in format: redis://default@host:port/db
    const redisUrl = this.configService.get<string>('REDIS_URL');
    const host = this.configService.get<string>('REDIS_HOST', 'localhost');
    const port = this.configService.get<number>('REDIS_PORT', 6379);
    const password = this.configService.get<string>('REDIS_PASSWORD');

    let options: RedisOptions;

    if (redisUrl) {
      // Parse Coolify Redis URL
      const url = new URL(redisUrl);
      options = {
        host: url.hostname,
        port: parseInt(url.port || '6379'),
        password: url.password || password,
        retryStrategy: (times) => Math.min(times * 50, 2000),
      };
    } else {
      options = {
        host,
        port,
        password,
        retryStrategy: (times) => Math.min(times * 50, 2000),
      };
    }

    this.client = new Redis(options);
    
    this.client.on('error', (err) => {
      this.logger.error('Redis connection error:', err);
    });

    this.client.on('connect', () => {
      this.logger.log('Redis connected successfully');
    });
  }

  async onModuleInit() {
    try {
      await this.client.ping();
      this.logger.log('✅ Redis connected');
    } catch (err) {
      this.logger.error('❌ Redis connection failed:', err);
    }
  }

  async onModuleDestroy() {
    await this.client.quit();
  }

  getClient(): Redis {
    return this.client;
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (ttlSeconds) {
      await this.client.setex(key, ttlSeconds, value);
    } else {
      await this.client.set(key, value);
    }
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  async incr(key: string): Promise<number> {
    return this.client.incr(key);
  }

  async expire(key: string, seconds: number): Promise<void> {
    await this.client.expire(key, seconds);
  }
}