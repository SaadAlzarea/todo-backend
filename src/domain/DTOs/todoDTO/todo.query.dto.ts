import type { Static } from "@sinclair/typebox";
import type {
    VCreateNewTodoDoInQuery,
    VCreateNewTodoDoOutResult,
    VCreatePersonalProjectDtoIn,
    VDeleteTodoByIdDtoInQuery,
} from "../../validation";

// * CREATE PERSONAL PROJECT
export interface ICreatePersonalProjectDtoIn extends Static<typeof VCreatePersonalProjectDtoIn> {}

// * CREATE NEW TODO QUERY
export interface ICreateNewTodoDoInQuery extends Static<typeof VCreateNewTodoDoInQuery> {}
export interface ICreateNewTodoDoOutResult extends Static<typeof VCreateNewTodoDoOutResult> {}

// * DELETE TODO QUERY
export interface IDeleteTodoByIdDtoInQuery extends Static<typeof VDeleteTodoByIdDtoInQuery> {}
