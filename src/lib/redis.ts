import { Redis } from "@upstash/redis";

// Upstash setup for rate limiter;
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
