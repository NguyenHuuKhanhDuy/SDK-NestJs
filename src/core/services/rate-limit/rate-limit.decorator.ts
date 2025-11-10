// src/common/modules/rate-limit/rate-limit.decorator.ts
import { applyDecorators, SetMetadata } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

export type RateLimitPreset = 'short' | 'normal' | 'long';

const presetMap: Record<RateLimitPreset, { limit: number; ttl: number }> = {
  short: { limit: 3, ttl: 10_000 },
  normal: { limit: 10, ttl: 60_000 },
  long: { limit: 50, ttl: 600_000 },
};

export function RateLimit(
  presetOrLimit: RateLimitPreset | number,
  ttlMs?: number,
) {
  let limit: number;
  let ttl: number;

  if (typeof presetOrLimit === 'string') {
    const preset = presetMap[presetOrLimit];
    if (!preset) {
      throw new Error(`Invalid RateLimit preset: ${presetOrLimit}`);
    }
    limit = preset.limit;
    ttl = preset.ttl;
  } else {
    limit = presetOrLimit;
    ttl = ttlMs ?? 60_000;
  }

  return applyDecorators(
    Throttle({
      default: { limit, ttl },
    }),
    SetMetadata('rate_limit_preset', presetOrLimit),
  );
}
