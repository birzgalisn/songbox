import { Ratelimit } from '@upstash/ratelimit';

import Redis from '@/lib/redis';
import RatelimitError from '@/errors/rate-limit';

export default abstract class RatelimiterClient {
  private limiter: Ratelimit;

  public constructor(...args: Parameters<typeof Ratelimit.fixedWindow>) {
    this.limiter = new Ratelimit({
      redis: Redis,
      limiter: Ratelimit.fixedWindow(...args),
    });
  }

  protected async limit(key: string) {
    return this.limiter.limit(key);
  }

  protected async enforceLimit(key: string) {
    const status = await this.limit(key);

    if (!status.success) {
      throw new RatelimitError();
    }
  }
}
