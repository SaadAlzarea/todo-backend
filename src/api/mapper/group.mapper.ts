import { group } from "node:console";
import { EGroupMemberRole } from "../../definition";
import type {
    IAddMemberToGroupDtoInQuery,
    ICreateGroupDtoIn,
    ICreateGroupDtoInQuery,
} from "../../domain";

export class GroupMapper {
    mapperInCreateGroup(
        body: ICreateGroupDtoIn,
        user: { user_id: string },
    ): ICreateGroupDtoInQuery {
        return {
            group_name: body.group_name,
            created_by: user.user_id,
        };
    }

    mapperToAddAdminMemberToGroup(
        body: { group_id: string; group_member_role: EGroupMemberRole },
        user: { user_id: string },
    ): IAddMemberToGroupDtoInQuery {
        return {
            group_id: body.group_id,
            user_id: user.user_id,
            group_member_role: EGroupMemberRole.ADMIN,
        };
    }
}
