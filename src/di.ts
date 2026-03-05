import { TodoRepo, TodoService, TodoClass, UserRepo, UserService, UserController } from "./api";
import { TodoModel, RegisterUserModel } from "./domain";

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
