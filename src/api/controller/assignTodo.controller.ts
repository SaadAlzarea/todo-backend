import { Multer } from "multer";
import { validator } from "../../adapter";
import type { HttpRequest } from "../../definition";
import type { ICreateAssignTodoInGroupProjectDtoIn } from "../../domain/DTOs/assignTodoDTO";
import { VCreateAssignTodoInGroupProjectDtoIn } from "../../domain/validation/assignTodoValidation";
import type { IApiResponse } from "../../helper";
import { dateValidator } from "../../helper/dateValidator.helper";
import { OK } from "../../utils";
import type { AssignTodoService } from "../services";

export class AssignTodoController {
    constructor(private readonly _assignTodoService: AssignTodoService) {}

    async createAssignTodoInGroupProject(
        httpRequest: HttpRequest<ICreateAssignTodoInGroupProjectDtoIn>,
    ): Promise<IApiResponse<any>> {
        const body = httpRequest.body;
        const user = (httpRequest as any).user;
        const files = httpRequest.files as Express.Multer.File[];

        validator(VCreateAssignTodoInGroupProjectDtoIn, body);
        const deadline = dateValidator(body.deadline);

        console.log("FILES:", httpRequest.files);
        console.log("FILES COUNT:", files?.length);

        const result = await this._assignTodoService.createAssignTodoInGroupProject(
            body,
            user,
            files,
            {
                deadline,
            },
        );

        return {
            statusCode: OK,
            body: {
                data: result,
                message: `Success in create assign todo with id ${result?.assign_todo_id}`,
            },
        };
    }
}
