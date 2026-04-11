import type { Static } from "@sinclair/typebox";
import type { VAddMemberToGroupDtoIn, VCreateGroupDtoIn } from "../../validation";

// * CREATE GROUP
export interface ICreateGroupDtoIn extends Static<typeof VCreateGroupDtoIn> {}

// * ADD MEMBER TO GROUP
export interface IAddMemberToGroupDtoIn extends Static<typeof VAddMemberToGroupDtoIn> {}
