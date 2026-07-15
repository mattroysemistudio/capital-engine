import { Redis } from '@upstash/redis';
import { randomBytes } from 'crypto';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export interface ShareToken {
  token: string;
  investorEmail: string;
  scenarioName: string;
  createdAt: number;
  expiresAt?: number;
  revoked: boolean;
}

/**
 * Generate a unique share token for an investor
 */
export async function generateShareToken(
  investorEmail: string,
  scenarioName: string,
  expiryDays?: number
): Promise<string> {
  const token = randomBytes(24).toString('hex');

  const tokenData: ShareToken = {
    token,
    investorEmail,
    scenarioName,
    createdAt: Date.now(),
    expiresAt: expiryDays ? Date.now() + expiryDays * 24 * 60 * 60 * 1000 : undefined,
    revoked: false,
  };

  // Store in Redis with token as key
  await redis.set(
    `capital-engine:token:${token}`,
    JSON.stringify(tokenData),
    { ex: expiryDays ? expiryDays * 24 * 60 * 60 : 365 * 24 * 60 * 60 } // TTL
  );

  return token;
}

/**
 * Validate a share token
 */
export async function validateShareToken(token: string): Promise<ShareToken | null> {
  const stored = await redis.get<ShareToken>(`capital-engine:token:${token}`);

  if (!stored) return null;

  const tokenData: ShareToken = stored as ShareToken;

  // Check if revoked
  if (tokenData.revoked) return null;

  // Check if expired
  if (tokenData.expiresAt && tokenData.expiresAt < Date.now()) return null;

  return tokenData;
}

/**
 * Revoke a token
 */
export async function revokeShareToken(token: string): Promise<void> {
  const stored = await redis.get<ShareToken>(`capital-engine:token:${token}`);
  if (!stored) return;

  const tokenData: ShareToken = stored as ShareToken;
  tokenData.revoked = true;

  await redis.set(`capital-engine:token:${token}`, JSON.stringify(tokenData));
}

/**
 * List all active tokens for an investor
 */
export async function listInvestorTokens(investorEmail: string): Promise<ShareToken[]> {
  // This is a bit of a hack since KV doesn't support efficient querying
  // In production, you'd want to also store a separate index
  // For now, we'll document this limitation
  console.log(`To list tokens for ${investorEmail}, implement a separate index in KV or database`);
  return [];
}
