import type { Static } from "@sinclair/typebox";
import type {
    VAssignTodoDtoIn,
    VCreateNewTodoDoIn,
    VCreateNewTodoDoOut,
    VDeleteTodoByIdDtoIn,
    VGetTodoDetailsDtoIn,
    VGetTodoDetailsDtoOut,
    VTodosWithFilterDtoIn,
    VTodosWithFilterDtoOut,
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
export interface ITodosWithFilterDtoOut extends Static<typeof VTodosWithFilterDtoOut> {}

// * GET TODO DETAILS
export interface IGetTodoDetailsDtoIn extends Static<typeof VGetTodoDetailsDtoIn> {}
export interface IGetTodoDetailsDtoOut extends Static<typeof VGetTodoDetailsDtoOut> {}

// * ASSIGN TODO
export interface IAssignTodoDtoIn extends Static<typeof VAssignTodoDtoIn> {}
