import { ICreatePersonalTodoCommentDtoIn } from "../../domain/DTOs/commentDTO/comment.dto";
import { ICreatePersonalTodoCommentDtoInQuery } from "../../domain/DTOs/commentDTO/comment.query.dto";

export class CommentMapper {
    mapTo_createPersonalTodoComment(
        body: { todo_id: string; body: string },
        authorInfo: { user_id: string },
    ): ICreatePersonalTodoCommentDtoInQuery {
        return {
            todo_id: body.todo_id,
            body: body.body,
            user_id: authorInfo.user_id,
        };
    }
}
