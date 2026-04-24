import { S3Client } from "@aws-sdk/client-s3";
import { env } from "./minio.config";

export const s3 = new S3Client({
    region: "us-east-1",
    endpoint: env.minio.endpoint,
    credentials: {
        accessKeyId: env.minio.accessKey,
        secretAccessKey: env.minio.secretKey,
    },
    forcePathStyle: true,
});
