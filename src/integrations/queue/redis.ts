import { Redis } from "ioredis";
import { REDIS_HOST, REDIS_NAME, REDIS_PORT } from "./redis.config";

export const redisConnection = new Redis({
    host: REDIS_HOST,
    port: REDIS_PORT,
    name: REDIS_NAME,

    maxRetriesPerRequest: null,
});
