import type { Static } from "@sinclair/typebox";
import type {
    VCreateAssignTodoInGroupProjectDtoInQuery,
    VCreateAssignTodoInGroupProjectDtoOutResult,
} from "../../validation/assignTodoValidation";

export interface ICreateAssignTodoInGroupProjectDtoInQuery
    extends Static<typeof VCreateAssignTodoInGroupProjectDtoInQuery> {}

export interface ICreateAssignTodoInGroupProjectDtoOutResult
    extends Static<typeof VCreateAssignTodoInGroupProjectDtoOutResult> {}
