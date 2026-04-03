// biome-ignore assist/source/organizeImports: <explanation>
import { TodoRepo, TodoService, TodoClass, UserRepo, UserService, UserController } from "./api";
import { UserMapper } from "./api/mapper/user.mapper";
import { TodoMapper } from "./api/mapper/todo.mapper";
import { TodoModel, RegisterUserModel } from "./domain";
import { db } from "./db";

export function initDI() {
    //TODO : Dependency Injection ..

    /**
     * * todo di
     */
    const todoRepo = new TodoRepo(TodoModel);
    const todoMapper = new TodoMapper();
    const todoService = new TodoService(todoRepo, todoMapper);
    const todoController = new TodoClass(todoService);

    /**
     * * user di
     */
    const userRepo = new UserRepo(db);
    const userMapper = new UserMapper();
    const userService = new UserService(userRepo, userMapper);
    const userController = new UserController(userService);

    return {
        //* === Todo classes ===
        todoController,
        todoMapper,
        todoService,
        todoRepo,
        //* === User classes ===
        userController,
        userMapper,
        userService,
        userRepo,
    };
}

export const di = initDI();
