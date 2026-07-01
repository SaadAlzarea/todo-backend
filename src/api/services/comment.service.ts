import { IUserPayload } from "../../definition";
import { ICreatePersonalTodoCommentDtoIn } from "../../domain/DTOs/commentDTO/comment.dto";
import { ICreatePersonalTodoCommentDOutResult } from "../../domain/DTOs/commentDTO/comment.query.dto";
import { ensure } from "../../helper";
import { BAD_REQUEST } from "../../utils";
import { CommentMapper } from "../mapper/comment.mapper";
import { CommentRepo } from "../repo/comment.repo";

export class CommentService {
    constructor(
        private readonly _commentRepo: CommentRepo,
        private readonly _commentMapper: CommentMapper,
    ) {}

    async createPersonalTodoComment(
        body: ICreatePersonalTodoCommentDtoIn,
        authorInfo: IUserPayload,
    ): Promise<Promise<ICreatePersonalTodoCommentDOutResult>> {
        const mapTo_createPersonalTodoComment = this._commentMapper.mapTo_createPersonalTodoComment(
            body,
            authorInfo,
        );

        const commentDB = await this._commentRepo.createPersonalTodoComment(
            mapTo_createPersonalTodoComment,
        );

        return commentDB;
    }
}
