import type { IUserPayload } from "../../definition";
import type {
    ICheckIsAdminToDeleteGroupProjectDtoInQuery,
    ICreateGroupProjectDtoIn,
    ICreateGroupProjectDtoInQuery,
    IDeleteGroupProjectDtoInQuery,
} from "../../domain";

export class GroupProjectMapper {
    mapperTo_createGroupProject(
        body: ICreateGroupProjectDtoIn,
        user: IUserPayload,
        deadline: { project_deadline: Date },
    ): ICreateGroupProjectDtoInQuery {
        const { project_name, group_id } = body;
        const { user_id } = user;
        const { project_deadline } = deadline;
        return {
            project_name: project_name,
            group_id: group_id,
            created_by: user_id,
            project_deadline: project_deadline,
        };
    }

    mapToGroupMember_mapInDeleteGroupProjectIsAdmin(
        body: { group_id: string },
        user: { user_id: string },
    ): ICheckIsAdminToDeleteGroupProjectDtoInQuery {
        return {
            group_id: body.group_id,
            user_id: user.user_id,
        };
    }
    mapToGroupProject_deleteGroupProject(body: {
        project_id: string;
        group_id: string;
    }): IDeleteGroupProjectDtoInQuery {
        return {
            project_id: body.project_id,
            group_id: body.group_id,
        };
    }

    mapToGroupMember_mapInEditGroupProjectIsAdmin(
        body: { group_id: string },
        user: { user_id: string },
    ) {
        return {
            group_id: body.group_id,
            user_id: user.user_id,
        };
    }

    mapToGetGroupProjectCreator(getAllGroupProject: { created_by: string }[]) {
        return getAllGroupProject.map((e) => ({
            user_id: e.created_by,
        }));
    }

    mapToCollectGroupProjects(
        getAllGroupProject: {
            project_name: string;
            created_by: string;
            project_deadline: string;
        }[],
        getGroupProjectCreator: { username: string }[],
    ) {
        return getAllGroupProject.map((element, index) => ({
            project_name: element.project_name,
            project_deadline: element.project_deadline,
            created_by: element.created_by,
            username: getGroupProjectCreator[index]?.username || "",
        }));
    }
}
