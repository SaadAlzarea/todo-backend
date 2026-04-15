import { group } from "node:console";
import { EGroupMemberRole } from "../../definition";
import type {
    IAddMemberToGroupDtoInQuery,
    IAddNewMemberToGroupDtoInQuery,
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

    mapperToCheckIsAdmin(body: { group_id: string }, AdminUserinfo: { user_id: string }) {
        return {
            admin_user_id: AdminUserinfo.user_id,
            group_id: body.group_id,
        };
    }

    mapperToAddedNewMemberToGroup(body: {
        group_id: string;
        member_user_id: string;
    }): IAddNewMemberToGroupDtoInQuery {
        return {
            group_id: body.group_id,
            member_user_id: body.member_user_id,
            group_member_role: EGroupMemberRole.MEMBER,
        };
    }

    mapperToCheckIsAdminINDeleteMember(
        body: { group_id: string },
        AdminUserinfo: { user_id: string },
    ) {
        return {
            admin_user_id: AdminUserinfo.user_id,
            group_id: body.group_id,
        };
    }

    mapperToCheckIsAdminINDeleteGroup(
        body: { group_id: string },
        AdminUserinfo: { user_id: string },
    ) {
        return {
            admin_user_id: AdminUserinfo.user_id,
            group_id: body.group_id,
        };
    }
}
