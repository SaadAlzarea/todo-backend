import { validator } from "../../adapter";
import type { HttpRequest, HttpResponse } from "../../definition";
import {
    type IGetAllUserWithFilterDtoIn,
    type IGetAllUserWithFilterDtoOut,
    type ILoginDtoIn,
    type ILoginDtoOut,
    type IRegisterDtoIn,
    type IRegisterDtoOut,
    VGetAllUserWithFilterDtoIn,
    VLoginDtoIn,
    VRegisterDtoIn,
} from "../../domain";
import type { IApiResponse } from "../../helper";
import { CREATED, OK } from "../../utils";
import type { UserService } from "../services";

export class UserController {
    constructor(private readonly _userService: UserService) {}

    async registerController(
        HttpRequest: HttpRequest<IRegisterDtoIn>,
    ): Promise<IApiResponse<IRegisterDtoOut>> {
        const body = HttpRequest.body;

        validator(VRegisterDtoIn, body);

        const result = await this._userService.registerService(body!);

        return {
            statusCode: CREATED,
            body: {
                data: result,
                message: `Registration successful`,
            },
        };
    }

    async userLoginController(
        httpRequest: HttpRequest<ILoginDtoIn>,
    ): Promise<IApiResponse<ILoginDtoOut>> {
        const body = httpRequest.body;
        validator(VLoginDtoIn, body);

        const result = await this._userService.userLoginService(body!);

        return {
            statusCode: OK,
            body: {
                data: result,
                message: `Login successful`,
            },
        };
    }

    async getAllUserForSuperAdminWithFilter(
        httpRequest: HttpRequest<IGetAllUserWithFilterDtoIn>,
    ): Promise<IApiResponse<IGetAllUserWithFilterDtoOut>> {
        const user = httpRequest.user;
        const body = httpRequest.body;

        validator(VGetAllUserWithFilterDtoIn, body);

        const limit: number = Number(body.limit) || 10;

        const result = await this._userService.getAllUserForSuperAdmin({ ...body, limit }, user!);

        return {
            statusCode: OK,
            body: {
                data: result,
                message: "Get all filtered users successfully",
            },
        };
    }
}
