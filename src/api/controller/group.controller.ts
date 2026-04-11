import { validator } from "../../adapter";
import type { HttpRequest, HttpResponse } from "../../definition";
import {
    type IAddMemberToGroupDtoIn,
    type ICreateGroupDtoIn,
    VAddMemberToGroupDtoIn,
    VCreateGroupDtoIn,
} from "../../domain";
import type { IApiResponse } from "../../helper";
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
}
