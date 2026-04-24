import { EAssignTodoAttachment } from "../../definition/enums/assignTodo.enum";
import type { MinioService } from "../../integrations/minio/minio.service";
import { scanQueue } from "../../integrations/queue/scan.queue";
import type { AttachmentRepo } from "../repo";

export class AttachmentService {
    constructor(
        private _minioService: MinioService,
        private readonly _attachmentRepo: AttachmentRepo,
    ) {}

    async uploadAttachment(file: Express.Multer.File) {
        const result = await this._minioService.upload(file);

        // const attachmentInfo = await this._attachmentRepo.attachmentInfo(result);

        return {
            ...result,
            status: EAssignTodoAttachment.PENDING,
        };
    }
}
