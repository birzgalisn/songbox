import Redis from '@/lib/redis';

export async function GET() {
  const [timestamp, microseconds] = await Redis.eval<
    [],
    [timestamp: number, microseconds: number]
  >(
    `
      local t = redis.call("TIME")
      return { tonumber(t[1]), tonumber(t[2]) }
    `,
    [],
    [],
  );

  return Response.json({ timestamp, microseconds });
}
