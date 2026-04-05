import type { Static } from "@sinclair/typebox";
import type {
    VCreateNewTodoDoIn,
    VCreateNewTodoDoOut,
    VDeleteTodoByIdDtoIn,
    VTodoIdDto,
    VTodosWithFilterDtoIn,
    VUpdateTodoDtoIn,
    VUpdateTodoDtoOut,
} from "../../validation";

// * CREATE NEW TODO
export interface ICreateNewTodoDoIn extends Static<typeof VCreateNewTodoDoIn> {}
export interface ICreateNewTodoDoOut extends Static<typeof VCreateNewTodoDoOut> {}

// * DELETE TODO
export interface IDeleteTodoByIdDtoIn extends Static<typeof VDeleteTodoByIdDtoIn> {}

// * UPDATE TODO
export interface IUpdateTodoDtoIn extends Static<typeof VUpdateTodoDtoIn> {}
export interface IUpdateTodoDtoOut extends Static<typeof VUpdateTodoDtoOut> {}

// * GET ALL TODOS WITH FILTER
export interface ITodosWithFilterDtoIn extends Static<typeof VTodosWithFilterDtoIn> {}

export interface ITodoIdDto extends Static<typeof VTodoIdDto> {}
// export interface ITodoFilterQuery extends Static<typeof VTodoFilterQuery> {}
