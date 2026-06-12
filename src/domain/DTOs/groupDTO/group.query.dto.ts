import type { Static } from "@sinclair/typebox";
import type {
    VAddedNewMemberToGroupDtoInQuery,
    VAddMemberToGroupDtoInQuery,
    VCreateGroupDtoInQuery,
    VGroupMembersInfoDtoOutResult,
} from "../../validation";

// * CREATE GROUP AND ADD ADMIN MEMBER
export interface ICreateGroupDtoInQuery extends Static<typeof VCreateGroupDtoInQuery> {}
export interface IAddMemberToGroupDtoInQuery extends Static<typeof VAddMemberToGroupDtoInQuery> {}
export interface IAddNewMemberToGroupDtoInQuery
    extends Static<typeof VAddedNewMemberToGroupDtoInQuery> {}

// * GET GROUP MEMBERS INFORMATION
export interface IGroupMembersInfoDtoOutResult
    extends Static<typeof VGroupMembersInfoDtoOutResult> {}
