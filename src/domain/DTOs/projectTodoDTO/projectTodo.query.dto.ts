import type { Static } from "@sinclair/typebox";
import type {
    VCreateNewProjectTodoDtoInQuery,
    VCreateNewProjectTodoDtoOutResult,
    VCreatePersonalProjectDtoIn,
    VDeleteTodoByIdDtoInQuery,
} from "../../validation";

// * CREATE PERSONAL PROJECT
export interface ICreatePersonalProjectDtoIn extends Static<typeof VCreatePersonalProjectDtoIn> {}

// * CREATE NEW TODO QUERY
export interface ICreateNewProjectTodoDtoInQuery
    extends Static<typeof VCreateNewProjectTodoDtoInQuery> {}
export interface ICreateNewProjectTodoDtoOutResult
    extends Static<typeof VCreateNewProjectTodoDtoOutResult> {}

// * DELETE TODO QUERY
export interface IDeleteTodoByIdDtoInQuery extends Static<typeof VDeleteTodoByIdDtoInQuery> {}
