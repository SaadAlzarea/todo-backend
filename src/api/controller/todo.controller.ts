import mongoose from "mongoose";
import { validator } from "../../adapter";
import type { HttpRequest, HttpResponse } from "../../definition";
import {
    type ITodoDto,
    VTodoDto,
    VDeleteTodoByIdDto,
    VTodoIdDto,
    VUpdateTodoDtoIn,
    VTodoFilterDto,
} from "../../domain";
import { CREATED, OK } from "../../utils";
import { TodoService } from "../services";
import { userInfo } from "node:os";

export class TodoClass {
    constructor(private readonly _todoService: TodoService) {}

    async createNewTodo(httpRequest: HttpRequest<ITodoDto>): Promise<HttpResponse> {
        const body = httpRequest.body;
        const user = (httpRequest as any).user;

        const createdData = await this._todoService.createNewTodoService(body, user);

        return {
            statusCode: CREATED,
            body: {
                data: createdData,
                message: "Created successfully",
            },
        };
    }

    async deleteTodoById(httpRequest: HttpRequest): Promise<HttpResponse> {
        const body = httpRequest.body;
        validator(VDeleteTodoByIdDto, body);

        await this._todoService.deleteTodoByIdService(body);

        return {
            statusCode: OK,
            body: {
                message: "Deleted successfully",
            },
        };
    }

    async updateTodoById(httpRequest: HttpRequest): Promise<HttpResponse> {
        const todoId = httpRequest.params.todoId;
        // validator(VTodoIdDto, { todoId });

        const body = httpRequest.body;
        // validator(VUpdateTodoDtoIn, body);

        const session = await mongoose.startSession();

        try {
            session.startTransaction();

            const updatedData = await this._todoService.updateTodoByIdService(
                {
                    ...body,
                    generatedId: todoId,
                },
                session,
            );

            await session.commitTransaction();

            return {
                statusCode: OK,
                body: {
                    data: updatedData,
                    message: "Updated successfully",
                },
            };
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    async getTodoFilter(HttpRequest: HttpRequest): Promise<HttpResponse> {
        const body = HttpRequest.body;
        const user = (HttpRequest as any).user;
        // validator(VTodoFilterDto, body);

        const page = parseInt(HttpRequest.body.page, 10) || 1;
        const limit = parseInt(HttpRequest.body.limit, 10) || 10;

        const getTodoFilter = await this._todoService.getAllAndFilterTodoByIdService(
            {
                generatedId: body.generatedId,
                priority: body.priority,
                status: body.status,
                page: page,
                limit: limit,
            },
            user,
        );

        return {
            statusCode: OK,
            body: {
                data: getTodoFilter,
                message: "get all filters todos successfully",
            },
        };
    }
    // create todo

    // async createNewTodo
    // async createNewTodo(
    //     req: Request<{}, {}, ITodoDto>,
    //     res: Response,
    //     next: NextFunction,
    // ): Promise<void> {
    //     const body = req.body;
    //     validator(VTodoDto, body);
    //     // const todoService = new TodoService();

    //     try {
    //         const createdData = await this._todoService.createNewTodoService(body);
    //         res.status(CREATED).json({
    //             message: `Created successfully`,
    //             data: createdData,
    //         });
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    // // delete todo
    // async deleteTodoById(req: Request, res: Response, next: NextFunction) {
    //     const body = req.body;
    //     validator(VDeleteTodoByIdDto, body);

    //     // const todoService = new TodoService();
    //     try {
    //         await this._todoService.deleteTodoByIdService(body);
    //         res.status(OK).json({
    //             message: `Deleted successfully`,
    //         });
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    // //  update and __v+1
    // async updateTodoById(req: Request, res: Response, next: NextFunction): Promise<void> {
    //     const todoId = req.params.todoId;
    //     validator(VTodoIdDto, { todoId });
    //     const body = req.body;
    //     validator(VUpdateTodoDtoIn, body);
    //     // const todoService = new TodoService();

    //     // transaction
    //     const session = await mongoose.startSession();
    //     try {
    //         session.startTransaction();

    //         const updatedData = await this._todoService.updateTodoByIdService(
    //             {
    //                 ...body,
    //                 generatedId: todoId,
    //             },
    //             session,
    //         );
    //         res.status(OK).json({
    //             message: `Updated is successfully`,
    //             data: updatedData,
    //         });

    //         await session.commitTransaction();
    //     } catch (error) {
    //         await session.abortTransaction();
    //         next(error);
    //     } finally {
    //         session.endSession();
    //     }
    // }

    // details
    // async getTodoDetailsById(req: Request, res: Response): Promise<void> {
    //     const todoId = req.body.todoId;
    //     validator(VTodoIdDto, { todoId });
    //     try {
    //         const SearchedTodoById = await Todo.findOne({ generatedId: todoId });
    //         res.status(OK).json({
    //             data: SearchedTodoById,
    //         });
    //     } catch (error) {
    //         res.status(NOT_FOUND).json({
    //             message: `No result ${error}`,
    //         });
    //     }
    // }
}
