import { TodoRepo } from "./api/repo/todo.repo";
import { TodoClass } from "./api/controller/todo.controller";
import { TodoService } from "./api/services/todo.service";

export function initDI() {
    // ! Todo DI
    const todoRepo = new TodoRepo();
    const todoService = new TodoService(todoRepo);
    const todoController = new TodoClass(todoService);

    return {
        todoController,
        todoService,
        todoRepo,
    };
}

export const di = initDI();
