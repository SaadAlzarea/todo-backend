import type { Static } from "@sinclair/typebox";
import type {
    VCreateNewTodoDoInQuery,
    VCreateNewTodoDoOutResult,
    VDeleteTodoByIdDtoInQuery,
} from "../../validation";

// * CREATE NEW TODO QUERY
export interface ICreateNewTodoDoInQuery extends Static<typeof VCreateNewTodoDoInQuery> {}
export interface ICreateNewTodoDoOutResult extends Static<typeof VCreateNewTodoDoOutResult> {}

// * DELETE TODO QUERY
export interface IDeleteTodoByIdDtoInQuery extends Static<typeof VDeleteTodoByIdDtoInQuery> {}
