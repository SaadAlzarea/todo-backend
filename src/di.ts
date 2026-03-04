import { TodoRepo } from "./api/repo/todo.repo";
import { TodoClass } from "./api/controller/todo.controller";
import { TodoService } from "./api/services/todo.service";
import { TodoModel } from "./domain/schema/todo.schema";
import { RegisterUserModel } from "./domain/schema/user.schema";
import { UserRepo } from "./api/repo/user.repo";
import { UserService } from "./api/services/user.service";
import { UserController } from "./api/controller/user.controller";

export function initDI() {
    //TODO : Dependency Injection ..

    /**
     * * todo di
     */
    const todoRepo = new TodoRepo(TodoModel);
    const todoService = new TodoService(todoRepo);
    const todoController = new TodoClass(todoService);

    /**
     * * user di
     */
    const userRepo = new UserRepo(RegisterUserModel);
    const userService = new UserService(userRepo);
    const userController = new UserController(userService);

    return {
        //* === Todo classes ===
        todoController,
        todoService,
        todoRepo,
        //* === User classes ===
        userController,
        userService,
        userRepo,
    };
}

export const di = initDI();
