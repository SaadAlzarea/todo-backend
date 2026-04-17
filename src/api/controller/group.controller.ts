import { validator } from "../../adapter";
import type { HttpRequest, HttpResponse } from "../../definition";
import {
    type IAddMemberToGroupDtoIn,
    type ICreateGroupDtoIn,
    type IDeleteGroupDtoIn,
    type IDeleteMemberFromGroupDtoIn,
    type IGetAllGroupMemberByIdDtoIn,
    type IGetAllGroupMemberByIdDtoOut,
    VAddMemberToGroupDtoIn,
    VCreateGroupDtoIn,
    VDeleteGroupDtoIn,
    VDeleteMemberFromGroupDtoIn,
    VGetAllGroupMemberByIdDtoIn,
} from "../../domain";
import type { IApiResponse } from "../../helper";
import { dateValidator } from "../../helper/dateValidator.helper";
import { OK } from "../../utils";
import type { GroupService } from "../services";

export class GroupController {
    constructor(private readonly _groupService: GroupService) {}

    async createGroup(httpRequest: HttpRequest<ICreateGroupDtoIn>): Promise<IApiResponse<any>> {
        const body = httpRequest.body;
        const user = (httpRequest as any).user;
        validator(VCreateGroupDtoIn, body);

        const result = await this._groupService.createGroup(body, user);
        return {
            statusCode: OK,
            body: {
                data: result,
                message: `Success in create Group with name ${body.group_name}`,
            },
        };
    }
    async addedNewMemberToGroup(
        httpRequest: HttpRequest<IAddMemberToGroupDtoIn>,
    ): Promise<IApiResponse<any>> {
        const body = httpRequest.body;
        const AdminUserinfo = (httpRequest as any).user;

        validator(VAddMemberToGroupDtoIn, body);

        const result = await this._groupService.addedNewMemberToGroup(body, AdminUserinfo);

        return {
            statusCode: OK,
            body: {
                data: result,
                message: `Success in added user with user_id ${body.member_user_id}`,
            },
        };
    }

    async deleteMemberFromGroup(
        httpRequest: HttpRequest<IDeleteMemberFromGroupDtoIn>,
    ): Promise<IApiResponse<any>> {
        const body = httpRequest.body;
        const AdminUserinfo = (httpRequest as any).user;

        validator(VDeleteMemberFromGroupDtoIn, body);
        const result = await this._groupService.deleteMemberFromGroup(body, AdminUserinfo);

        return {
            statusCode: OK,
            body: {
                data: result,
                message: `Success in delete user with user_id ${body.member_user_id} from group`,
            },
        };
    }

    async getAllGroupMemberById(
        httpRequest: HttpRequest<IGetAllGroupMemberByIdDtoIn>,
    ): Promise<IApiResponse<IGetAllGroupMemberByIdDtoOut>> {
        const body = httpRequest.body;

        validator(VGetAllGroupMemberByIdDtoIn, body);

        const result = await this._groupService.getAllGroupMemberById(body);

        return {
            statusCode: OK,
            body: {
                data: result,
                message: `Success in get group member with group_id ${body.group_id}`,
            },
        };
    }

    async deleteGroup(httpRequest: HttpRequest<IDeleteGroupDtoIn>): Promise<IApiResponse<any>> {
        const body = httpRequest.body;
        const AdminUserinfo = (httpRequest as any).user;
        validator(VDeleteGroupDtoIn, body);
        const result = await this._groupService.deleteGroup(body, AdminUserinfo);
        return {
            statusCode: OK,
            body: {
                data: result,
                message: `Success in delete group with group_id ${body.group_id}`,
            },
        };
    }

    // async assignTodo(httpRequest: HttpRequest<IAssignTodoDtoIn>): Promise<IApiResponse<any>> {
    //     const body = httpRequest.body;
    //     const AdminUserinfo = (httpRequest as any).user;
    // }
}
