import type {
    ICreateNewTodoDoIn,
    IDeleteTodoByIdDtoIn,
    IGetTodoDetailsDtoIn,
    IGetTodoDetailsDtoOut,
    ITodosWithFilterDtoIn,
    IUpdateTodoDtoIn,
} from "../../domain";
import { ensure } from "../../helper";
import { BAD_REQUEST, NOT_FOUND } from "../../utils";
import type { TodoMapper } from "../mapper";
import type { TodoRepo } from "../repo";

export class TodoService {
    constructor(
        private readonly _todoRepo: TodoRepo,
        private readonly _todoMapper: TodoMapper,
    ) {}

    // * CREATE NEW TODO
    async createNewTodoService(todoData: ICreateNewTodoDoIn, user: { user_id: string }) {
        const createNewTodoServiceMapper = this._todoMapper.createNewTodoServiceMapper(
            todoData,
            user,
        );
        const createNewTodoRepo = await this._todoRepo.createNewTodoRepo(
            createNewTodoServiceMapper,
        );

        ensure(!createNewTodoRepo, "Error in create todo", NOT_FOUND);

        const result = this._todoMapper.createNewTodoServiceDtoOut(createNewTodoRepo);

        return result;
    }

    async getTodosWithFilterService(body: ITodosWithFilterDtoIn, user: { user_id: string }) {
        const { page = 1, limit = 10, todo_id, priority, status } = body;

        const mapped = this._todoMapper.getTodosWithFilterServiceMapper(body, user);

        const result = await this._todoRepo.getAllTodosWithFilter(mapped);

        const totalTodos = await this._todoRepo.getTotalTodosCount({
            user_id: user.user_id,
            ...(todo_id && { todo_id }),
            ...(priority && { priority }),
            ...(status && { status }),
        });

        return {
            data: result,
            page,
            limit,
            total: totalTodos,
        };
    }

    // * UPDATE TODO
    async updateTodoByIdService(updateTodoByIdBody: IUpdateTodoDtoIn) {
        const { todo_id, ...updateFields } = updateTodoByIdBody;

        const hasUpdates = Object.values(updateFields).some((v) => v !== undefined);

        ensure(hasUpdates, `No fields to update in todo with id ${todo_id}`, BAD_REQUEST);

        const updatedTodo = await this._todoRepo.updateTodoByIdRepo(updateTodoByIdBody);
        ensure(!updatedTodo, `Todo with id ${todo_id} not found`, NOT_FOUND);

        return updatedTodo;
    }

    // * DELETE TODO
    async deleteTodoByIdService(deleteTodoByIdBody: IDeleteTodoByIdDtoIn) {
        const deleteTodoByIdServiceMapper =
            this._todoMapper.deleteTodoByIdServiceMapper(deleteTodoByIdBody);

        const deleteTodo = await this._todoRepo.deleteTodoByIdRepo(deleteTodoByIdServiceMapper);

        ensure(deleteTodo, `Error in delete todo with id ${deleteTodo.todo_id}`, NOT_FOUND);

        return deleteTodo;
    }

    async getTodoDetailsService(body: IGetTodoDetailsDtoIn): Promise<IGetTodoDetailsDtoOut> {
        const todoDetails = await this._todoRepo.getTodoDetailsRepo(body);

        ensure(!todoDetails, `Error in get todo with id ${todoDetails.todo_id}`, NOT_FOUND);

        return todoDetails;
    }
}

// body.name || ""
// git all todo with filter
// async getTodosWithFilterService(
//     getAllAndFilterTodoByIdBody: ITodosWithFilterDtoIn,
//     user: { user_id: string; role: string },
// ) {
//     const { todo_id, priority, status, page, limit } = getAllAndFilterTodoByIdBody;
//     const query: any = {};
//     if (todo_id) query.todo_id = todo_id;
//     if (priority) query.priority = priority;
//     if (status) query.status = status;

//     if (user.role === EUserRole.USER) {
//         query.user_id = user.user_id;
//     }

//     const filteredTodo = await this._todoRepo.getAllTodosWithFilter({
//         query: query,
//         page: page,
//         limit: limit,
//     });

//     const totalTodos = await this._todoRepo.getTotalTodosCount(query);
//     return {
//         query: filteredTodo,
//         page,
//         limit,
//         totalTodo: totalTodos,
//     };
// }
