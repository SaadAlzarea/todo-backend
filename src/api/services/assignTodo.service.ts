import type { IUserPayload } from "../../definition";
import { EAssignTodoAttachment } from "../../definition/enums/assignTodo.enum";
import type { ICreateAssignTodoInGroupProjectDtoIn } from "../../domain/DTOs/assignTodoDTO";
import { ensure } from "../../helper";
import type { MinioService } from "../../integrations/minio/minio.service";
import { scanQueue } from "../../integrations/queue/scan.queue";
import { upload } from "../../middleware/multer.middleware";
import { BAD_REQUEST } from "../../utils";
import type { AssignTodoMapper } from "../mapper/assignTodo.mapper";
import type { AssignTodoRepo } from "../repo";

export class AssignTodoService {
    constructor(
        private readonly _assignTodoRepo: AssignTodoRepo,
        private readonly _minioService: MinioService,
        private readonly _assignTodoMapper: AssignTodoMapper,
    ) {}

    async createAssignTodoInGroupProject(
        body: ICreateAssignTodoInGroupProjectDtoIn,
        user: IUserPayload,
        files: Express.Multer.File[],
        deadline: { deadline: Date },
    ) {
        const mapToAssignTodo_createAssignTodo =
            this._assignTodoMapper.mapToAssignTodo_createAssignTodo(user, body, deadline);

        const assignTodo = await this._assignTodoRepo.createAssignTodoInGroupProject(
            mapToAssignTodo_createAssignTodo,
        );

        ensure(
            !!assignTodo,
            `Error in save todo with id ${assignTodo?.assign_todo_id}`,
            BAD_REQUEST,
        );

        // * upload attachment
        // if (files?.length) {
        //     await Promise.all(
        //         files.map(async (file) => {
        //             const uploaded = await this._minioService.upload(file);
        //             await this._assignTodoRepo.addAttachment({
        //                 assign_todo_id: assignTodo?.assign_todo_id,
        //                 file_url: uploaded.url,
        //                 public_id: uploaded.key,
        //                 attachment_type: file.mimetype,
        //                 file_name: file.originalname,
        //                 file_size: file.size?.toString(),
        //                 uploaded_by: user.user_id,
        //                 status: EAssignTodoAttachment.PENDING,
        //             });
        //         }),
        //     );
        // }
        if (files?.length) {
            await Promise.all(
                files.map(async (file) => {
                    const uploaded = await this._minioService.upload(file);

                    const attachment = await this._assignTodoRepo.addAttachment({
                        assign_todo_id: assignTodo?.assign_todo_id,
                        file_url: uploaded.url,
                        public_id: uploaded.key,
                        attachment_type: file.mimetype,
                        file_name: file.originalname,
                        file_size: file.size?.toString(),
                        uploaded_by: user.user_id,
                        status: "pending",
                    });

                    console.log("here is scanning");

                    await scanQueue.add("scan", {
                        attachment_id: attachment?.attachment_id,
                        file_key: uploaded.key,
                    });
                }),
            );
        }

        return assignTodo;
    }
}
