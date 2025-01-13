import Sleep from '@/lib/sleep';
import RetryAttemptsReachedError from '@/errors/retry-attempts-reached';

class Retry {
  public static readonly defaultMaxAttempts = 5;

  public static async exponentialRetry<T>(
    callback: (attempt: number, maxAttempts: number) => Promise<T>,
    maxAttempts = Retry.defaultMaxAttempts,
    initialDelay = Sleep.defaultSleepInMs,
  ) {
    let cause: unknown;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        return await callback(attempt, maxAttempts);
      } catch (error) {
        cause = error;

        if (attempt < maxAttempts - 1) {
          await Sleep.exponentialBackoff(attempt, initialDelay);
        }
      }
    }

    throw new RetryAttemptsReachedError(cause);
  }
}

export default Retry;
