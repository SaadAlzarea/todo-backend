import type { Static } from "@sinclair/typebox";
import type { VAddMemberToGroupDtoInQuery, VCreateGroupDtoInQuery } from "../../validation";

// * CREATE GROUP AND ADD ADMIN MEMBER
export interface ICreateGroupDtoInQuery extends Static<typeof VCreateGroupDtoInQuery> {}
export interface IAddMemberToGroupDtoInQuery extends Static<typeof VAddMemberToGroupDtoInQuery> {}
