import "dotenv/config";

export const REDIS_HOST = process.env.REDIS_HOST as string;
export const REDIS_PORT = process.env.REDIS_PORT as unknown as number;
export const REDIS_NAME = process.env.REDIS_NAME as string;
