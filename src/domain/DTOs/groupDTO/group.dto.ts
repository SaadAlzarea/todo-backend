import type { Static } from "@sinclair/typebox";
import type {
    VAddMemberToGroupDtoIn,
    VCreateGroupDtoIn,
    VDeleteGroupDtoIn,
    VDeleteMemberFromGroupDtoIn,
    VGetAllGroupMemberByIdDtoIn,
    VGetAllGroupMemberByIdDtoOut,
} from "../../validation";

// * CREATE GROUP
export interface ICreateGroupDtoIn extends Static<typeof VCreateGroupDtoIn> {}

// * ADD MEMBER TO GROUP
export interface IAddMemberToGroupDtoIn extends Static<typeof VAddMemberToGroupDtoIn> {}

// * DELETE MEMBER
export interface IDeleteMemberFromGroupDtoIn extends Static<typeof VDeleteMemberFromGroupDtoIn> {}

// * GET ALL MEMBER
export interface IGetAllGroupMemberByIdDtoIn extends Static<typeof VGetAllGroupMemberByIdDtoIn> {}
export interface IGetAllGroupMemberByIdDtoOut extends Static<typeof VGetAllGroupMemberByIdDtoOut> {}

// * DELETE GROUP
export interface IDeleteGroupDtoIn extends Static<typeof VDeleteGroupDtoIn> {}
