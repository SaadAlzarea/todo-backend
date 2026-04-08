import { validator } from "../../adapter";
import type { HttpRequest, HttpResponse } from "../../definition";
import {
    type ICreateNewTodoDoIn,
    type ICreateNewTodoDoOut,
    type IDeleteTodoByIdDtoIn,
    type IGetTodoDetailsDtoIn,
    type IGetTodoDetailsDtoOut,
    type ITodosWithFilterDtoOut,
    // type ITodosWithFilterDtoIn,
    type IUpdateTodoDtoIn,
    type IUpdateTodoDtoOut,
    VCreateNewTodoDoIn,
    VDeleteTodoByIdDtoIn,
    VGetTodoDetailsDtoIn,
    VTodosWithFilterDtoIn,
    VUpdateTodoDtoIn,
} from "../../domain";
import type { IApiResponse, IEmptyApiResponse } from "../../helper";
import { AppError } from "../../middleware";
import { CREATED, OK } from "../../utils";
import type { TodoService } from "../services";

export class TodoClass {
    constructor(private readonly _todoService: TodoService) {}

    async createNewTodo(
        httpRequest: HttpRequest<ICreateNewTodoDoIn>,
    ): Promise<IApiResponse<ICreateNewTodoDoOut>> {
        const body = httpRequest.body;
        const user = (httpRequest as any).user || "user";

        // console.log("USER =>", (httpRequest as any).user);
        if (!user?.user_id) {
            throw new AppError("Unauthorized - user not found", 401);
        }
        // ensure(user, "Unauthorized - user not found", UNAUTHORIZED);

        validator(VCreateNewTodoDoIn, body);

        const createdData = await this._todoService.createNewTodoService(body, user);

        return {
            statusCode: CREATED,
            body: {
                message: "Created successfully",
                data: createdData,
            },
        };
    }

    async deleteTodoById(
        httpRequest: HttpRequest<IDeleteTodoByIdDtoIn>,
    ): Promise<IEmptyApiResponse> {
        const body = httpRequest.body;
        validator(VDeleteTodoByIdDtoIn, body);

        await this._todoService.deleteTodoByIdService(body);

        return {
            statusCode: OK,
            body: {
                message: "Deleted successfully",
            },
        };
    }

    async updateTodoById(
        httpRequest: HttpRequest<IUpdateTodoDtoIn>,
    ): Promise<IApiResponse<IUpdateTodoDtoOut>> {
        const body = httpRequest.body;
        validator(VUpdateTodoDtoIn, body);

        const updatedData = await this._todoService.updateTodoByIdService(body);

        return {
            statusCode: OK,
            body: {
                data: updatedData,
                message: "Updated successfully",
            },
        };
    }

    async getTodoWithFilterAndLimit(
        HttpRequest: HttpRequest,
    ): Promise<IApiResponse<ITodosWithFilterDtoOut>> {
        const body = HttpRequest.body;
        const user = (HttpRequest as any).user;

        validator(VTodosWithFilterDtoIn, body);

        const page = parseInt(body.page, 10) || 1;
        const limit = parseInt(body.limit, 10) || 10;

        const result = await this._todoService.getTodosWithFilterService(
            {
                todo_id: body.todo_id,
                priority: body.priority,
                status: body.status,
                page,
                limit,
            },
            user,
        );

        return {
            statusCode: OK,
            body: {
                data: result,
                message: "Get all filtered todos successfully",
            },
        };
    }

    async getTodoDetailsController(
        httpRequest: HttpRequest<IGetTodoDetailsDtoIn>,
    ): Promise<IApiResponse<IGetTodoDetailsDtoOut>> {
        const body = httpRequest.body;

        validator(VGetTodoDetailsDtoIn, body);

        const result = await this._todoService.getTodoDetailsService(body);

        return {
            statusCode: OK,
            body: {
                data: result,
                message: `Get todo details is successfully`,
            },
        };
    }

    // async updateTodoById(httpRequest: HttpRequest<IUpdateTodoDtoIn>): Promise<HttpResponse> {
    //     const body = httpRequest.body;
    //     validator(VUpdateTodoDtoIn, body);

    //     const session = await mongoose.startSession();

    //     try {
    //         session.startTransaction();

    //         const updatedData = await this._todoService.updateTodoByIdService(body, session);

    //         await session.commitTransaction();

    //         return {
    //             statusCode: OK,
    //             body: {
    //                 data: updatedData,
    //                 message: "Updated successfully",
    //             },
    //         };
    //     } catch (error) {
    //         await session.abortTransaction();
    //         throw error;
    //     } finally {
    //         session.endSession();
    //     }
}
