// biome-ignore assist/source/organizeImports: <explanation>
import {
    TodoRepo,
    TodoService,
    TodoClass,
    UserRepo,
    UserService,
    UserController,
    GroupRepo,
    GroupService,
    GroupController,
} from "./api";
import { UserMapper } from "./api/mapper/user.mapper";
import { TodoMapper } from "./api/mapper/todo.mapper";
import { db } from "./db";
import { GroupMapper } from "./api/mapper/group.mapper";
import { EmailService } from "./api/clients";

export function initDI() {
    //TODO : Dependency Injection ..

    /**
     * * THIRD PARTY
     */
    const emailService = new EmailService();
    /**
     * * TODO DI
     */
    const todoRepo = new TodoRepo(db);
    const todoMapper = new TodoMapper();
    const todoService = new TodoService(todoRepo, todoMapper);
    const todoController = new TodoClass(todoService);

    /**
     * * USER DI
     */
    const userRepo = new UserRepo(db);
    const userMapper = new UserMapper();
    const userService = new UserService(userRepo, userMapper);
    const userController = new UserController(userService);
    /**
     * * GROUP DI
     */
    const groupRepo = new GroupRepo(db);
    const groupMapper = new GroupMapper();
    const groupService = new GroupService(groupRepo, groupMapper, db, emailService);
    const groupController = new GroupController(groupService);

    return {
        // * === TODO classes ===
        todoController,
        todoMapper,
        todoService,
        todoRepo,

        // * === USER classes ===
        userController,
        userMapper,
        userService,
        userRepo,

        // * === GROUP classes ===
        groupController,
        groupMapper,
        groupService,
        groupRepo,
    };
}

export const di = initDI();
