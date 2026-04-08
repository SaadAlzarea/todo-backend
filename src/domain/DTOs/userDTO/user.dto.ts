import type { Static } from "@sinclair/typebox";
import type {
    VGetAllUserWithFilterDtoIn,
    VGetAllUserWithFilterDtoOut,
    VLoginDtoIn,
    VLoginDtoOut,
    VRegisterDtoIn,
    VRegisterDtoOut,
} from "../../validation";

// * REGISTER
export interface IRegisterDtoIn extends Static<typeof VRegisterDtoIn> {}
export interface IRegisterDtoOut extends Static<typeof VRegisterDtoOut> {}

// * LOGIN
export interface ILoginDtoIn extends Static<typeof VLoginDtoIn> {}
export interface ILoginDtoOut extends Static<typeof VLoginDtoOut> {}

// * GET ALL USER
export interface IGetAllUserWithFilterDtoIn extends Static<typeof VGetAllUserWithFilterDtoIn> {}
export interface IGetAllUserWithFilterDtoOut extends Static<typeof VGetAllUserWithFilterDtoOut> {}
