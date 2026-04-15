import { Type } from "@sinclair/typebox";
import { EGroupMemberRole } from "../../../definition";

// * CREATE GROUP
export const VCreateGroupDtoIn = Type.Object({
    group_name: Type.String(),
});

// * ADD MEMBER TO GROUP
export const VAddMemberToGroupDtoIn = Type.Object({
    member_user_id: Type.String(),
    group_id: Type.String(),
});

// * DELETE MEMBER
export const VDeleteMemberFromGroupDtoIn = Type.Object({
    member_user_id: Type.String(),
    group_id: Type.String(),
});

// * GET ALL MEMBER IN GROUP
export const VGetAllGroupMemberByIdDtoIn = Type.Object({
    group_id: Type.String(),
});

export const VGetAllGroupMemberByIdDtoOut = Type.Object({
    data: Type.Array(
        Type.Object({
            group_member_id: Type.String(),
            group_id: Type.String(),
            user_id: Type.String(),
            group_member_role: Type.Enum(EGroupMemberRole),
        }),
    ),
    message: Type.String(),
});

// * DELETE GROUP
export const VDeleteGroupDtoIn = Type.Object({
    group_id: Type.String(),
});
