import "dotenv/config";

export const env = {
    port: process.env.PORT || "3000",

    minio: {
        endpoint: process.env.MINIO_ENDPOINT!,
        accessKey: process.env.MINIO_ACCESS_KEY!,
        secretKey: process.env.MINIO_SECRET_KEY!,
        bucket: process.env.MINIO_BUCKET!,
        publicUrl: process.env.MINIO_PUBLIC_URL!,
    },

    upload: {
        maxFileSize: Number(process.env.MAX_FILE_SIZE),
    },
};
