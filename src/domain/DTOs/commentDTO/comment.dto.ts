import { Static } from "@sinclair/typebox";
import {
    VCreatePersonalTodoCommentDtoIn,
    VCreatePersonalTodoCommentDtoOut,
} from "../../validation/commentValidation/comment.validation";

export interface ICreatePersonalTodoCommentDtoIn
    extends Static<typeof VCreatePersonalTodoCommentDtoIn> {}

export interface ICreatePersonalTodoCommentDtoOut
    extends Static<typeof VCreatePersonalTodoCommentDtoOut> {}
