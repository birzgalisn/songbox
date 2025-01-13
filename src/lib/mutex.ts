import Redis from '@/lib/redis';

export default class Mutex {
  private static readonly defaultExpiryInSeconds = 5;
  private static readonly Redis = Redis;

  public static async acquireLock(
    key: string,
    expiryInSeconds = Mutex.defaultExpiryInSeconds,
  ) {
    const result = await Mutex.Redis.set(key, 'LOCKED', {
      nx: true,
      ex: expiryInSeconds,
    });
    return result === 'OK';
  }

  public static async releaseLock(key: string) {
    const script = `
      if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("del", KEYS[1])
      else
        return 0
      end
    `;
    return Mutex.Redis.eval(script, [key], ['LOCKED']);
  }

  public static async withLock<T>(
    key: string,
    action: (isLockAcquired: boolean) => Promise<T>,
    expiryInSeconds = Mutex.defaultExpiryInSeconds,
  ): Promise<T> {
    const isLockAcquired = await this.acquireLock(key, expiryInSeconds);
    return action(isLockAcquired).finally(() => void this.releaseLock(key));
  }
}
