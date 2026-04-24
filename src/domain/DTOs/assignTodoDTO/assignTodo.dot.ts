import type { Static } from "@sinclair/typebox";
import type {
    VCreateAssignTodoInGroupProjectDtoIn,
    VCreateAssignTodoInGroupProjectDtoOut,
} from "../../validation/assignTodoValidation";

export interface ICreateAssignTodoInGroupProjectDtoIn
    extends Static<typeof VCreateAssignTodoInGroupProjectDtoIn> {}

export interface ICreateAssignTodoInGroupProjectDtoOut
    extends Static<typeof VCreateAssignTodoInGroupProjectDtoOut> {}
