import { ErrorCode } from "bullmq";
import { validator } from "../../adapter";
import { HttpRequest } from "../../definition";
import { ICreatePersonalTodoCommentDtoIn } from "../../domain/DTOs/commentDTO/comment.dto";
import { VCreatePersonalTodoCommentDtoIn } from "../../domain/validation/commentValidation/comment.validation";
import { CommentService } from "../services/comment.service";
import { EErrorStatusCode } from "../../helper/errorStatusCode.helper";
import { ensure, IApiResponse } from "../../helper";
import { CREATED, UNAUTHORIZED } from "../../utils";

export class CommentController {
    constructor(private readonly _CommentService: CommentService) {}

    async createPersonalTodoComment(
        httpRequest: HttpRequest<ICreatePersonalTodoCommentDtoIn>,
    ): Promise<IApiResponse<ICreatePersonalTodoCommentDtoIn>> {
        const body = httpRequest.body;
        const authorInfo = (httpRequest as any).user;

        validator(
            VCreatePersonalTodoCommentDtoIn,
            body,
            EErrorStatusCode.BODY_VALIDATION_ERROR_CREATE_PERSONAL_TODO_COMMENT,
            `Error in create todo for todo with id ${body.todo_id}`,
        );
        ensure(authorInfo, "Unauthorized", UNAUTHORIZED);

        const result = await this._CommentService.createPersonalTodoComment(body, authorInfo);

        return {
            statusCode: CREATED,
            body: {
                data: result,
                message: `Success in create comment to todo with id ${result.todo_id} `,
            },
        };
    }
}
