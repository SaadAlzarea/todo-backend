import type { IUserPayload } from "../../definition";
import { EAssignTodoAttachment } from "../../definition/enums/assignTodo.enum";
import type {
    ICreateAssignTodoInGroupProjectDtoIn,
    IGetAllAssignTodoInGroupProjectListDtoIn,
    IGetAssignTodoInGroupProjectDetailsWithAttachmentDtoIn,
} from "../../domain/DTOs/assignTodoDTO";
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
        const todos = this._assignTodoMapper.mapToAssignTodo_createAssignTodo(user, body, deadline);

        const assignTodos = await this._assignTodoRepo.createAssignTodoInGroupProject(todos);

        ensure(!!assignTodos, `Error in save todo`, BAD_REQUEST);

        if (files?.length) {
            await Promise.all(
                assignTodos.map(async (todo) => {
                    await Promise.all(
                        files.map(async (file) => {
                            const uploaded = await this._minioService.upload(file);

                            const attachment = await this._assignTodoRepo.addAttachment({
                                assign_todo_id: todo.assign_todo_id,
                                file_url: uploaded.url,
                                public_id: uploaded.key,
                                attachment_type: file.mimetype,
                                file_name: file.originalname,
                                file_size: file.size?.toString(),
                                uploaded_by: user.user_id,
                                status: "pending",
                            });

                            await scanQueue.add("scan", {
                                attachment_id: attachment?.attachment_id,
                                file_key: uploaded.key,
                            });
                        }),
                    );
                }),
            );
        }

        return assignTodos;
    }
    async getAllAssignTodoInGroupProjectList(body: IGetAllAssignTodoInGroupProjectListDtoIn) {
        const getAssignTodoList = await this._assignTodoRepo.getAllAssignTodoInGroupProject(body);
        ensure(
            !!getAssignTodoList,
            `Error in get assign todo to project with id ${body.project_id}`,
            BAD_REQUEST,
        );
        return getAssignTodoList;
    }
    async getAssignTodoInGroupProjectDetailsWithAttachment(
        body: IGetAssignTodoInGroupProjectDetailsWithAttachmentDtoIn,
    ) {
        //  get todo
        const assignTodoDetails = await this._assignTodoRepo.getAssignTodoDetails(body);
        ensure(
            !assignTodoDetails,
            `Error in get todo with id ${body.assign_todo_id} details`,
            BAD_REQUEST,
        );

        // get attachment if there is
        const getAssignTodoAttachment = await this._assignTodoRepo.getAssignTodoAttachment(body);
        ensure(!!getAssignTodoAttachment, `Error in get todo attachment`, BAD_REQUEST);

        return {
            assignTodoDetails,
            getAssignTodoAttachment,
        };
    }
}
