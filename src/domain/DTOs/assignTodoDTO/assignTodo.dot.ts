import type { Static } from "@sinclair/typebox";
import type {
    VCreateAssignTodoInGroupProjectDtoIn,
    VCreateAssignTodoInGroupProjectDtoOut,
    VGetAllAssignTodoInGroupProjectListDtoIn,
    VGetAllAssignTodoInGroupProjectListDtoOut,
    VGetAssignTodoInGroupProjectDetailsWithAttachmentDtoIn,
} from "../../validation/assignTodoValidation";

// * CREATE ASSIGN TODO
export interface ICreateAssignTodoInGroupProjectDtoIn
    extends Static<typeof VCreateAssignTodoInGroupProjectDtoIn> {}
export interface ICreateAssignTodoInGroupProjectDtoOut
    extends Static<typeof VCreateAssignTodoInGroupProjectDtoOut> {}

// * GET ALL ASSIGN TODO
export interface IGetAllAssignTodoInGroupProjectListDtoIn
    extends Static<typeof VGetAllAssignTodoInGroupProjectListDtoIn> {}
export interface IGetAllAssignTodoInGroupProjectListDtoOut
    extends Static<typeof VGetAllAssignTodoInGroupProjectListDtoOut> {}

// * GET ASSIGN TODO DETAILS WITH ATTACHMENT
export interface IGetAssignTodoInGroupProjectDetailsWithAttachmentDtoIn
    extends Static<typeof VGetAssignTodoInGroupProjectDetailsWithAttachmentDtoIn> {}
