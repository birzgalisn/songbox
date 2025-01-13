import { SetCommandOptions, Redis as UpstashRedis } from '@upstash/redis';

class RedisClient {
  private redis: UpstashRedis;
  private static instance: RedisClient;

  private constructor() {
    this.redis = UpstashRedis.fromEnv();
  }

  public static getInstance() {
    return (RedisClient.instance ??= new RedisClient());
  }

  public async get<T>(key: string) {
    return this.redis.get<T>(key);
  }

  public async set<T>(key: string, value: T, opts?: SetCommandOptions) {
    return this.redis.set(key, value, opts);
  }

  public async eval<A extends unknown[], T>(
    script: string,
    keys: string[],
    args: A,
  ): Promise<T> {
    return this.redis.eval(script, keys, args);
  }

  public async evalsha<A extends unknown[], T>(
    sha1: string,
    keys: string[],
    args: A,
  ): Promise<T> {
    return this.redis.evalsha(sha1, keys, args);
  }

  public async scriptLoad(script: string) {
    return this.redis.scriptLoad(script);
  }
}

const Redis = RedisClient.getInstance();

export type TRedis = typeof Redis;

export default Redis;
