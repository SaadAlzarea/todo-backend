import { EGroupMemberRole, type IUserPayload } from "../../definition";
import type {
    ICreateGroupProjectDtoIn,
    ICreateGroupProjectDtoOut,
    IDeleteGroupProjectDtoIn,
    IEditGroupProjectDtoIn,
    IGetAllGroupProjectsDtoIn,
} from "../../domain";
import { ensure } from "../../helper";
import { BAD_REQUEST, UNAUTHORIZED } from "../../utils";
import type { GroupProjectMapper } from "../mapper";
import type { GroupProjectRepo } from "../repo";

export class GroupProjectService {
    constructor(
        private readonly _groupProjectRepo: GroupProjectRepo,
        private readonly _groupProjectMapper: GroupProjectMapper,
        private readonly _db: any,
    ) {}
    async createGroupProject(
        body: ICreateGroupProjectDtoIn,
        user: IUserPayload,
        deadline: { project_deadline: Date },
    ) {
        const mapperTo_createGroupProject = this._groupProjectMapper.mapperTo_createGroupProject(
            body,
            user,
            deadline,
        );

        const createdGroupProject = await this._groupProjectRepo.createGroupProject(
            mapperTo_createGroupProject,
        );

        ensure(!!createdGroupProject, `Error in create group project`, BAD_REQUEST);

        return createdGroupProject;
    }

    async deleteGroupProject(body: IDeleteGroupProjectDtoIn, user: IUserPayload) {
        const mapToGroupMember_isAdmin =
            this._groupProjectMapper.mapToGroupMember_mapInDeleteGroupProjectIsAdmin(body, user);
        const isAdmin = await this._groupProjectRepo.checkIsGroupAdmin(mapToGroupMember_isAdmin);
        ensure(
            isAdmin?.group_member_role === EGroupMemberRole.ADMIN,
            "You are unauthorized",
            UNAUTHORIZED,
        );

        const mapToGroupProject_deleteGroupProject =
            this._groupProjectMapper.mapToGroupProject_deleteGroupProject(body);

        const deletedGroupProject = await this._groupProjectRepo.deleteGroupProject(
            mapToGroupProject_deleteGroupProject,
        );
        ensure(
            deletedGroupProject,
            `Error in delete group project with id ${body.project_id}`,
            BAD_REQUEST,
        );

        return deletedGroupProject;
    }

    async getAllGroupProject(body: IGetAllGroupProjectsDtoIn) {
        const getAllGroupProject = await this._groupProjectRepo.getAllGroupProject(body);
        ensure(
            getAllGroupProject,
            `Error in get project to group with id ${body.group_id}`,
            BAD_REQUEST,
        );

        const mapToGetGroupProjectCreator =
            this._groupProjectMapper.mapToGetGroupProjectCreator(getAllGroupProject);

        const getGroupProjectCreator = await this._groupProjectRepo.getGroupProjectCreator(
            mapToGetGroupProjectCreator,
        );
        ensure(
            getGroupProjectCreator,
            `Error in get project to group with id ${body.group_id}`,
            BAD_REQUEST,
        );

        const mapToCollectGroupProjects = this._groupProjectMapper.mapToCollectGroupProjects(
            getAllGroupProject,
            getGroupProjectCreator,
        );

        return mapToCollectGroupProjects;
    }

    // async editGroupProject(body: IEditGroupProjectDtoIn, user: IUserPayload) {
    //     const mapToGroupMember_isAdmin =
    //         this._groupProjectMapper.mapToGroupMember_mapInEditGroupProjectIsAdmin(body, user);
    // }
}
