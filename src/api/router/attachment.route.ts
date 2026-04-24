import { Router } from "express";
import { expressAdapter } from "../../adapter";
import { di } from "../../di";
import { attachmentTodoPath } from "../../domain/paths/attachment.path";
import { groupProjectPath } from "../../domain/paths/groupProject.path";
import { authMiddleware } from "../../middleware";
import { upload } from "../../middleware/multer.middleware";

export const attachmentRouter = Router();

const { attachmentController, assignTodoController } = di;
const { uploadAttachment, assignTodo } = attachmentTodoPath;

attachmentRouter.post(
    assignTodo,
    upload.array("attachments"),
    authMiddleware,
    expressAdapter(assignTodoController.createAssignTodoInGroupProject.bind(assignTodoController)),
);
