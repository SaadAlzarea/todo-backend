import type { Static } from "@sinclair/typebox";
import type {
    VGetAllUserWithFilterDtoInQuery,
    VLoginDtoInQuery,
    VLoginDtoOutResult,
    VRegisterDtoInQuery,
    VRegisterDtoOutResult,
} from "../../validation";

// * REGISTER
export interface IRegisterDtoInQuery extends Static<typeof VRegisterDtoInQuery> {}
export interface IRegisterDtoOutResult extends Static<typeof VRegisterDtoOutResult> {}

// * LOGIN
export interface ILoginDtoInQuery extends Static<typeof VLoginDtoInQuery> {}
export interface ILoginDtoOutResult extends Static<typeof VLoginDtoOutResult> {}

// * GET ALL USER
export interface IGetAllUserWithFilterDtoInQuery
    extends Static<typeof VGetAllUserWithFilterDtoInQuery> {}
