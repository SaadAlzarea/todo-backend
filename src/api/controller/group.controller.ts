import { validator } from "../../adapter";
import type { HttpRequest, HttpResponse } from "../../definition";
import { type ICreateGroupDtoIn, VCreateGroupDtoIn } from "../../domain";
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
}
