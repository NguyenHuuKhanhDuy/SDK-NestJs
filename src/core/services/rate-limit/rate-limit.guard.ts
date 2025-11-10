// src/common/modules/rate-limit/rate-limit.guard.ts
import { CommonException } from '@common/exceptions';
import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class RateLimitGuard extends ThrottlerGuard {
  protected throwThrottlingException(): Promise<void> {
    throw CommonException.TooManyRequests('system.EXH.EXH_ERR_002');
  }
}
