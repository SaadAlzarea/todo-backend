import type { Static } from "@sinclair/typebox";
import type {
    VAssignTodoDtoIn,
    VCreateNewProjectTodoDoIn,
    VCreateNewProjectTodoDoOut,
    VDeleteTodoByIdDtoIn,
    VGetTodoDetailsDtoIn,
    VGetTodoDetailsDtoOut,
    VTodosWithFilterDtoIn,
    VTodosWithFilterDtoOut,
    VUpdateTodoDtoIn,
    VUpdateTodoDtoOut,
} from "../../validation";

// ! TODO
// * CREATE NEW TODO
export interface ICreateNewProjectTodoDoIn extends Static<typeof VCreateNewProjectTodoDoIn> {}
export interface ICreateNewProjectTodoDoOut extends Static<typeof VCreateNewProjectTodoDoOut> {}

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
