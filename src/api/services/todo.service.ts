import mongoose from "mongoose";
import { ITodoDto, ITodoFiltersDto, IUpdateTodoDtoIn, IDeleteTodoByIdDto } from "../../domain";
import { TodoRepo } from "../repo";

export class TodoService {
    constructor(private readonly _todoRepo: TodoRepo) {}

    // create todo
    async createNewTodoService(createNewTodo: ITodoDto) {
        const body = createNewTodo;
        const createdData = await this._todoRepo.createNewTodoRepo(body);
        return createdData;
    }

    // body.name || ""
    // git all todo with filter
    async getAllAndFilterTodoByIdService(getAllAndFilterTodoByIdBody: ITodoFiltersDto) {
        const { generatedId, priority, status, page, limit } = getAllAndFilterTodoByIdBody;
        const query: any = {};
        if (generatedId) query.generatedId = generatedId;
        if (priority) query.priority = priority;
        if (status) query.status = status;

        const filteredTodo = await this._todoRepo.getAllAndFilterTodoByIdRepo({
            query: query,
            page: page,
            limit: limit,
        });

        const totalTodos = await this._todoRepo.getTotalTodoList(query);
        return {
            query: filteredTodo,
            page,
            limit,
            totalTodo: totalTodos,
        };
    }

    // update todo
    async updateTodoByIdService(
        updateTodoByIdBody: IUpdateTodoDtoIn,
        session: mongoose.ClientSession,
    ) {
        const updatedTodo = await this._todoRepo.updateTodoByIdRepo(updateTodoByIdBody, session);
        return updatedTodo;
    }

    // delete todo
    async deleteTodoByIdService(deleteTodoByIdBody: IDeleteTodoByIdDto) {
        const { todoId } = deleteTodoByIdBody;
        const deleteTodo = await this._todoRepo.deleteTodoByIdRepo({ todoId });
        return deleteTodo;
    }
}
