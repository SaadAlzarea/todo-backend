import { validator } from "../../adapter/validator.adapter";
import { VRegisterDto, VLoginDto } from "../../domain/validation/user.validation";
import { IRegisterDto, ILoginDto } from "../../domain/DTOs/user.dto";
import { UserService } from "../services/user.service";
import type { HttpResponse, HttpRequest } from "../../definition/types/adapter.type";
import { CREATED, OK } from "../../utils/http-status";

export class UserController {
    constructor(private readonly _userService: UserService) {}

    async registerNewUser(HttpRequest: HttpRequest<IRegisterDto>): Promise<HttpResponse> {
        const body = HttpRequest.body;
        validator(VRegisterDto, body);

        const token = await this._userService.registerNewUser(body!);

        return {
            statusCode: CREATED,
            body: {
                data: token,
                message: `Registration successful`,
            },
        };
    }

    async userLogin(httpRequest: HttpRequest<ILoginDto>): Promise<HttpResponse> {
        const body = httpRequest.body;
        validator(VLoginDto, body);

        const token = await this._userService.login(body!);

        return {
            statusCode: OK,
            body: {
                data: token,
                message: `Login successful`,
            },
        };
    }
}
