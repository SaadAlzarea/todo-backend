import type { Static } from "@sinclair/typebox";
import type {
    VCreateGroupProjectDtoIn,
    VCreateGroupProjectDtoOut,
    VDeleteGroupProjectDtoIn,
    VEditGroupProjectDtoIn,
    VGetAllGroupProjectsDtoIn,
    VGetAllGroupProjectsDtoOut,
} from "../../validation";

// * CREATE GROUP PROJECT
export interface ICreateGroupProjectDtoIn extends Static<typeof VCreateGroupProjectDtoIn> {}
export interface ICreateGroupProjectDtoOut extends Static<typeof VCreateGroupProjectDtoOut> {}

// * DELETE GROUP PROJECT
export interface IDeleteGroupProjectDtoIn extends Static<typeof VDeleteGroupProjectDtoIn> {}

// * GET ALL GROUP PROJECTS
export interface IGetAllGroupProjectsDtoIn extends Static<typeof VGetAllGroupProjectsDtoIn> {}
export interface IGetAllGroupProjectsDtoOut extends Static<typeof VGetAllGroupProjectsDtoOut> {}

// * EDIT GROUP PROJECT
export interface IEditGroupProjectDtoIn extends Static<typeof VEditGroupProjectDtoIn> {}
