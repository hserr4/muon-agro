import { SetMetadata } from '@nestjs/common';

export const RATE_LIMIT_KEY = 'rateLimit';
export const RateLimit = (limit: number, ttl: number = 60) =>
  SetMetadata(RATE_LIMIT_KEY, { limit, ttl });

export interface RateLimitOptions {
  limit: number;
  ttl: number;
}

export const Throttle = (limit: number, ttl: number) =>
  SetMetadata('throttle', { limit, ttl });