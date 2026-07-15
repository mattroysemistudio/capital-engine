import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export interface TokenAccessLog {
  token: string;
  investorEmail: string;
  accessedAt: number;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Log a token access event
 */
export async function logTokenAccess(
  token: string,
  investorEmail: string,
  ipAddress?: string,
  userAgent?: string
): Promise<void> {
  const log: TokenAccessLog = {
    token,
    investorEmail,
    accessedAt: Date.now(),
    ipAddress,
    userAgent,
  };

  // Store in a time-series list
  const logKey = `capital-engine:access-log:${token}`;
  const logs = await redis.lrange(logKey, 0, -1);

  // Keep last 100 accesses per token
  if (logs.length >= 100) {
    await redis.lpop(logKey);
  }

  await redis.rpush(logKey, JSON.stringify(log));

  // Also store in a global access index for analytics
  const globalKey = `capital-engine:all-accesses`;
  await redis.rpush(globalKey, JSON.stringify(log));
}

/**
 * Get access logs for a specific token
 */
export async function getTokenAccessLogs(token: string): Promise<TokenAccessLog[]> {
  const logs = await redis.lrange<TokenAccessLog>(`capital-engine:access-log:${token}`, 0, -1);
  return logs as TokenAccessLog[];
}

/**
 * Get all access logs (admin view)
 */
export async function getAllAccessLogs(limit: number = 1000): Promise<TokenAccessLog[]> {
  const logs = await redis.lrange<TokenAccessLog>(`capital-engine:all-accesses`, -limit, -1);
  return (logs as TokenAccessLog[]).reverse();
}
