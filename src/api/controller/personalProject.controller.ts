import { validator } from "../../adapter";
import type { HttpRequest } from "../../definition";
import {
    type ICreatePersonalProjectDtoIn,
    type IDeletePersonalProjectDtoIn,
    type IGetAllPersonalProjectDtoOut,
    VCreatePersonalProjectDtoIn,
    VDeletePersonalProjectDtoIn,
} from "../../domain";

import type { IApiResponse } from "../../helper";
import { dateValidator } from "../../helper/dateValidator.helper";
import { OK } from "../../utils";
import type { PersonalProjectService } from "../services";

export class PersonalProjectController {
    constructor(private readonly _personalProjectService: PersonalProjectService) {}

    async createPersonalProject(
        httpRequest: HttpRequest<ICreatePersonalProjectDtoIn>,
    ): Promise<IApiResponse<any>> {
        const body = httpRequest.body;
        const userinfo = (httpRequest as any).user;

        const project_deadline = dateValidator(body.project_deadline);
        validator(VCreatePersonalProjectDtoIn, body);

        const createsPersonalProject = await this._personalProjectService.createPersonalProject(
            { project_deadline },
            body,
            userinfo,
        );

        return {
            statusCode: OK,
            body: {
                data: createsPersonalProject,
                message: `Create personal project with name : ${body.project_name} is successfully`,
            },
        };
    }

    async deletePersonalProject(
        httpRequest: HttpRequest<IDeletePersonalProjectDtoIn>,
    ): Promise<IApiResponse<any>> {
        const body = httpRequest.body;
        validator(VDeletePersonalProjectDtoIn, body);
        const deletedProject = await this._personalProjectService.deletePersonalProject(body);

        return {
            statusCode: OK,
            body: {
                data: deletedProject,
                message: `Success in delete personal project with id ${body.project_id}`,
            },
        };
    }

    async getAllPersonalProject(
        httpRequest: HttpRequest,
    ): Promise<IApiResponse<IGetAllPersonalProjectDtoOut>> {
        const userInfo = (httpRequest as any).user;

        const allPersonalProject =
            await this._personalProjectService.getAllPersonalProject(userInfo);

        return {
            statusCode: OK,
            body: {
                data: allPersonalProject,
                message: "Get all Personal Project successfully",
            },
        };
    }
}
