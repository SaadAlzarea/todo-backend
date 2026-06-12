import { Type } from "@sinclair/typebox";
import { EGroupMemberRole } from "../../../definition";

//* CREATE GROUP AND MAKE ADMIN USER
export const VCreateGroupDtoInQuery = Type.Object({
    group_name: Type.String(),
    created_by: Type.String(),
});

export const VAddMemberToGroupDtoInQuery = Type.Object({
    user_id: Type.String(),
    group_id: Type.String(),
    group_member_role: Type.Enum(EGroupMemberRole),
});

export const VAddedNewMemberToGroupDtoInQuery = Type.Object({
    member_email: Type.String(),
    group_id: Type.String(),
    group_member_role: Type.String(),
});

// export const VGroupMembersInfoDtoOutResult = Type.Object({
//     email: Type.String(),
//     username: Type.String(),
//     group_member_id: Type.String(),
//     group_id: Type.String(),
//     user_id: Type.String(),
//     group_member_role: Type.String(),
// });
export const VGroupMembersInfoDtoOutResult = Type.Object({
    email: Type.String(),
    username: Type.String(),
    group_member_id: Type.String(),
    group_id: Type.String(),
    user_id: Type.String(),
    group_member_role: Type.String(),
});
