import { and, eq } from "drizzle-orm";
import { AssignTodoAttachment, db } from "../../db";
export class AttachmentRepo {
    constructor(private readonly _db = db) {}

    async attachmentInfo(body: { url: string; key: string }) {
        const result = await this._db
            .select({
                attachment_id: AssignTodoAttachment.attachment_id,
                public_id: AssignTodoAttachment.public_id,
            })
            .from(AssignTodoAttachment)
            .where(and(eq(AssignTodoAttachment.file_url, body.url)));

        return result[0] || null;
    }
}
