import type { Static } from "@sinclair/typebox";
import type {
    VCheckIsAdminToDeleteGroupProjectDtoInQuery,
    VCreateGroupProjectDtoInQuery,
    VCreateGroupProjectDtoOutResult,
    VDeleteGroupProjectDtoInQuery,
} from "../../validation";

export interface ICreateGroupProjectDtoInQuery
    extends Static<typeof VCreateGroupProjectDtoInQuery> {}

export interface ICreateGroupProjectDtoOutResult
    extends Static<typeof VCreateGroupProjectDtoOutResult> {}

// * DELETE GROUP PROJECT
export interface ICheckIsAdminToDeleteGroupProjectDtoInQuery
    extends Static<typeof VCheckIsAdminToDeleteGroupProjectDtoInQuery> {}

export interface IDeleteGroupProjectDtoInQuery
    extends Static<typeof VDeleteGroupProjectDtoInQuery> {}
