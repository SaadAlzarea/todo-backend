import { Type } from "@sinclair/typebox";
import { EGroupMemberRole } from "../../../definition";

export const VCreateGroupDtoInQuery = Type.Object({
    group_name: Type.String(),
    created_by: Type.String(),
});

export const VAddMemberToGroupDtoInQuery = Type.Object({
    user_id: Type.String(),
    group_id: Type.String(),
    group_member_role: Type.Enum(EGroupMemberRole),
});
