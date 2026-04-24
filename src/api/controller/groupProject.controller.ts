import { validator } from "../../adapter";
import type { HttpRequest, IUserPayload } from "../../definition";
import {
    type ICreateGroupProjectDtoIn,
    type ICreateGroupProjectDtoOut,
    type IDeleteGroupProjectDtoIn,
    type IEditGroupProjectDtoIn,
    VCreateGroupProjectDtoIn,
    VDeleteGroupProjectDtoIn,
    VEditGroupProjectDtoIn,
} from "../../domain";
import type { IApiResponse } from "../../helper";
import { dateValidator } from "../../helper/dateValidator.helper";
import { OK } from "../../utils";
import type { GroupProjectService } from "../services";

export class GroupProjectController {
    constructor(private readonly _groupProjectService: GroupProjectService) {}

    async createGroupProject(
        httpRequest: HttpRequest<ICreateGroupProjectDtoIn>,
    ): Promise<IApiResponse<ICreateGroupProjectDtoOut>> {
        const body = httpRequest.body;
        const user = (httpRequest as any).user;

        validator(VCreateGroupProjectDtoIn, body);
        const project_deadline = dateValidator(body.project_deadline);

        const result = await this._groupProjectService.createGroupProject(body, user, {
            project_deadline,
        });

        return {
            statusCode: OK,
            body: {
                data: result,
                message: `Success in create nre project in group with id ${result.group_id}`,
            },
        };
    }
    async deleteGroupProject(
        httpRequest: HttpRequest<IDeleteGroupProjectDtoIn>,
    ): Promise<IApiResponse<any>> {
        const body = httpRequest.body;
        const user = (httpRequest as any).user;

        validator(VDeleteGroupProjectDtoIn, body);

        const result = await this._groupProjectService.deleteGroupProject(body, user);

        return {
            statusCode: OK,
            body: {
                data: result,
                message: `Success in delete group project with id ${body.project_id}`,
            },
        };
    }

    // async editGroupProject(httpRequest: HttpRequest<IEditGroupProjectDtoIn>) {
    //     const body = httpRequest.body;
    //     const user = (httpRequest as any).user;

    //     validator(VEditGroupProjectDtoIn, body);

    //     const result = await this._groupProjectService.editGroupProject(body, user);
    // }
}
