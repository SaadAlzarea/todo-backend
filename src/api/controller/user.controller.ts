import { validator } from "../../adapter";
import { HttpResponse, HttpRequest } from "../../definition";
import { IRegisterDto, VRegisterDto, ILoginDto, VLoginDto } from "../../domain";
import { CREATED, OK } from "../../utils";
import { UserService } from "../services";

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

    // async getAllUserForSuperAdmin(httpRequest: HttpRequest): Promise<HttpResponse> {
    //     const body = httpRequest.body;
    //     const token = await this._userService.getAllUserForSuperAdmin(body);
    // }
}
