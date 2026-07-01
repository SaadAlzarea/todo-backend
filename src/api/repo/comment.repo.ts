import to from "await-to-js";
import { db, PersonalTodoCommentTable } from "../../db";
import {
    ICreatePersonalTodoCommentDOutResult,
    ICreatePersonalTodoCommentDtoInQuery,
} from "../../domain/DTOs/commentDTO/comment.query.dto";
import { RepositoryException } from "../../helper/repositoryException";
import { EErrorStatusCode } from "../../helper/errorStatusCode.helper";

export class CommentRepo {
    constructor(private readonly _db = db) {}

    async createPersonalTodoComment(
        query: ICreatePersonalTodoCommentDtoInQuery,
    ): Promise<ICreatePersonalTodoCommentDOutResult> {
        const [error, result] = await to(
            this._db.insert(PersonalTodoCommentTable).values(query).returning(),
        );

        if (error) {
            throw new RepositoryException(
                EErrorStatusCode.REPOSITORY_ERROR_CREATE_PERSONAL_TODO_COMMENT,
                `While insert personal todo comment to todo with id ${query.todo_id} get error details : ${error.message}`,
                `${this.constructor.name}.${this.createPersonalTodoComment.name}.error`,
            );
        }

        if (!result[0]) {
            throw new RepositoryException(
                EErrorStatusCode.REPOSITORY_ERROR_CREATE_PERSONAL_TODO_COMMENT,
                `Insert succeeded but no row returned for todo with id ${query.todo_id}`,
                `${this.constructor.name}.${this.createPersonalTodoComment.name}.error`,
            );
        }

        return result[0];
    }
}
