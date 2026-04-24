import multer from "multer";
import { env } from "../integrations/minio/minio.config";

export const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: env.upload.maxFileSize,
    },
});
