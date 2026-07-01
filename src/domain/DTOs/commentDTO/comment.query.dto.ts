import { Static } from "@sinclair/typebox";
import {
    VCreatePersonalTodoCommentDOutResult,
    VCreatePersonalTodoCommentDtoInQuery,
} from "../../validation/commentValidation/comment.query";

export interface ICreatePersonalTodoCommentDtoInQuery
    extends Static<typeof VCreatePersonalTodoCommentDtoInQuery> {}

export interface ICreatePersonalTodoCommentDOutResult
    extends Static<typeof VCreatePersonalTodoCommentDOutResult> {}
