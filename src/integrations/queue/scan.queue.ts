import { Queue } from "bullmq";
import { redisConnection } from "./redis";
//this queue setup
export const scanQueue = new Queue("scan-attachments", {
    connection: redisConnection,
});
