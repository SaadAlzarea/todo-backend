import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";
import { env } from "./minio.config";

export class MinioService {
    constructor(private s3: any) {}

    async upload(file: Express.Multer.File) {
        const key = `${randomUUID()}-${file.originalname}`;

        await this.s3.send(
            new PutObjectCommand({
                Bucket: env.minio.bucket,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
            }),
        );

        const url = await getSignedUrl(
            this.s3,
            new GetObjectCommand({
                Bucket: env.minio.bucket,
                Key: key,
            }),
            { expiresIn: 3600 },
        );

        return {
            key,
            url,
        };
    }
}
