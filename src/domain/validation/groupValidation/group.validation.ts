import { Type } from "@sinclair/typebox";

// * CREATE GROUP
export const VCreateGroupDtoIn = Type.Object({
    group_name: Type.String(),
});

// * ADD MEMBER TO GROUP
export const VAddMemberToGroupDtoIn = Type.Object({
    member_user_id: Type.String(),
    group_id: Type.String(),
});
