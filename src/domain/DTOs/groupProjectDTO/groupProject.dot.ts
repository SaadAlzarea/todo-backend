import type { Static } from "@sinclair/typebox";
import type {
    VCreateGroupProjectDtoIn,
    VCreateGroupProjectDtoOut,
    VDeleteGroupProjectDtoIn,
    VEditGroupProjectDtoIn,
} from "../../validation";

// * CREATE GROUP PROJECT
export interface ICreateGroupProjectDtoIn extends Static<typeof VCreateGroupProjectDtoIn> {}
export interface ICreateGroupProjectDtoOut extends Static<typeof VCreateGroupProjectDtoOut> {}

// * DELETE GROUP PROJECT
export interface IDeleteGroupProjectDtoIn extends Static<typeof VDeleteGroupProjectDtoIn> {}

// * EDIT GROUP PROJECT
export interface IEditGroupProjectDtoIn extends Static<typeof VEditGroupProjectDtoIn> {}
