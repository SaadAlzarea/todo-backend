import { group } from "node:console";
import { EGroupMemberRole } from "../../definition";
import type {
    IAddMemberToGroupDtoInQuery,
    IAddNewMemberToGroupDtoInQuery,
    ICreateGroupDtoIn,
    ICreateGroupDtoInQuery,
    IGroupMembersInfoDtoOutResult,
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
        member_email: string;
    }): IAddNewMemberToGroupDtoInQuery {
        return {
            group_id: body.group_id,
            member_email: body.member_email,
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

    mapToCollectMemberInfo(
        users: {
            email: string;
            username: string;
        }[],
        members: {
            group_member_id: string;
            group_id: string;
            user_id: string;
            group_member_role: EGroupMemberRole;
        }[],
    ) {
        return members.map((member, index) => ({
            email: users[index]?.email ?? "",
            username: users[index]?.username ?? "",
            group_member_id: member.group_member_id,
            group_id: member.group_id,
            user_id: member.user_id,
            group_member_role: member.group_member_role,
        }));
    }
}
