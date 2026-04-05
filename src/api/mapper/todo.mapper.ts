import type { ETodoPriority, ETodoStatus } from "../../definition";
import type { ICreateNewTodoDoIn, IDeleteTodoByIdDtoIn } from "../../domain";
import type {
    ICreateNewTodoDoInQuery,
    ICreateNewTodoDoOutResult,
    IDeleteTodoByIdDtoInQuery,
} from "../../domain/DTOs/todoDTO/todo.query.dto";

export class TodoMapper {
    createNewTodoServiceMapper(
        todoData: ICreateNewTodoDoIn,
        user: { user_id: string },
    ): ICreateNewTodoDoInQuery {
        return {
            title: todoData.title,
            body: todoData.body,
            progress: todoData.progress ?? null,
            priority: todoData.priority,
            status: todoData.status,
            user_id: user.user_id,
        };
    }

    createNewTodoServiceDtoOut(createNewTodoRepo: {
        todo_id: string;
        title: string;
        body: string;
        progress?: string;
        priority: ETodoPriority;
        status: ETodoStatus;
        user_id: string;
    }): ICreateNewTodoDoOutResult {
        return {
            todo_id: createNewTodoRepo.todo_id,
            title: createNewTodoRepo.title,
            body: createNewTodoRepo.body,
            progress: createNewTodoRepo.progress ?? null,
            priority: createNewTodoRepo.priority,
            status: createNewTodoRepo.status,
            user_id: createNewTodoRepo.user_id,
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
