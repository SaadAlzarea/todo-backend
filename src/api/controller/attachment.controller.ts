import type { Request, Response } from "express";
import type { HttpRequest, HttpResponse } from "../../definition";
import type { IApiResponse } from "../../helper";
import { scanQueue } from "../../integrations/queue/scan.queue";
import { BAD_REQUEST, OK } from "../../utils";
import type { AttachmentService } from "../services/attachment.service";

export class AttachmentController {
    constructor(private _attachmentService: AttachmentService) {}

    async upload(httpRequest: HttpRequest): Promise<IApiResponse<any>> {
        const files = httpRequest.files as Express.Multer.File[];

        if (!files) {
            return {
                statusCode: BAD_REQUEST,
                body: {
                    message: `Error : No files attachment`,
                },
            };
        }

        const uploadedFiles = await Promise.all(
            files.map(async (file) => {
                return await this._attachmentService.uploadAttachment(file);
            }),
        );

        return {
            statusCode: OK,
            body: {
                data: uploadedFiles,
                message: `Success in upload files`,
            },
        };
    }
}
