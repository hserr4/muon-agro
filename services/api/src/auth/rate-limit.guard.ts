import { Injectable, CanActivate, ExecutionContext, ForbiddenException, RequestTimeoutException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RedisService } from '../redis/redis.service';
import { RATE_LIMIT_KEY, RateLimitOptions } from './rate-limit.decorator';

@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private redis: RedisService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const options = this.reflector.getAllAndOverride<RateLimitOptions>(RATE_LIMIT_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!options) {
      return true;
    }

    const key = `rate_limit:${request.ip}:${context.getHandler().name}`;
    const current = await this.redis.incr(key);

    if (current === 1) {
      await this.redis.expire(key, options.ttl || 60);
    }

    if (current > options.limit) {
      throw new ForbiddenException('Too many requests. Please try again later.');
    }

    return true;
  }
}