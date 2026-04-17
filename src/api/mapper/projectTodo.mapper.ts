import type { ETodoPriority, ETodoStatus, IUserPayload } from "../../definition";
import type {
    ICreateNewProjectTodoDoIn,
    ICreateNewProjectTodoDtoInQuery,
    ICreateNewProjectTodoDtoOutResult,
    IDeleteTodoByIdDtoIn,
    IDeleteTodoByIdDtoInQuery,
} from "../../domain";

export class ProjectTodoMapper {
    /**
     *
     * @param todoData
     * @param user
     * @returns
     */
    /**
     *  * PERSONAL PROJECT MAPPER
     */

    /**
     *  * TODOS
     */
    createNewTodoServiceMapper(
        todoData: ICreateNewProjectTodoDoIn,
        user: IUserPayload,
        date: { project_deadline: Date },
    ): ICreateNewProjectTodoDtoInQuery {
        return {
            project_id: todoData.project_id,
            title: todoData.title,
            body: todoData.body,
            priority: todoData.priority,
            status: todoData.status,
            todo_deadline: date.project_deadline,
            user_id: user.user_id,
        };
    }

    createNewTodoServiceDtoOut(body: {
        todo_id: string;
        title: string;
        body: string;
        priority: ETodoPriority;
        status: ETodoStatus;
        user_id: string;
        project_id: string;
        todo_deadline: Date;
        createdAt: Date;
        updatedAt: Date;
    }): ICreateNewProjectTodoDtoOutResult {
        return {
            todo_id: body.todo_id,
            project_id: body.project_id,
            user_id: body.user_id,
            title: body.title,
            body: body.body,
            priority: body.priority,
            status: body.status,
            todo_deadline: body.todo_deadline,
            createdAt: body.createdAt,
            updatedAt: body.updatedAt,
        };
    }

    deleteTodoByIdServiceMapper(
        deleteTodoByIdBody: IDeleteTodoByIdDtoIn,
    ): IDeleteTodoByIdDtoInQuery {
        return {
            todo_id: deleteTodoByIdBody.todo_id,
        };
    }

    getTodosWithFilterServiceMapper(
        body: {
            todo_id?: string;
            priority?: ETodoPriority;
            status?: ETodoStatus;
            page?: number;
            limit?: number;
        },
        user: { user_id: string },
    ) {
        const { todo_id, priority, status, page = 1, limit = 10 } = body;

        const offset = (page - 1) * limit;

        return {
            user_id: user.user_id,
            ...(todo_id && { todo_id }),
            ...(priority && { priority }),
            ...(status && { status }),
            limit,
            offset,
        };
    }
}
