import {
    EmailService,
    GroupController,
    GroupMapper,
    GroupRepo,
    PersonalProjectController,
    // GroupService,
    PersonalProjectMapper,
    PersonalProjectRepo,
    // PersonalProjectService,
    ProjectTodoController,
    ProjectTodoMapper,
    ProjectTodoRepo,
    // ProjectTodoService,
    UserController,
    UserMapper,
    UserRepo,
    // UserService,
} from "./api";
// import { EmailService } from "./api/clients";

import { GroupService } from "./api/services/group.service";
import { PersonalProjectService } from "./api/services/personalProject.service";
import { ProjectTodoService } from "./api/services/projectTodo.service";
import { UserService } from "./api/services/user.service";

import { db } from "./db";

export function initDI() {
    //TODO : Dependency Injection ..

    /**
     * * THIRD PARTY
     */
    const emailService = new EmailService();

    /**
     * * TODO DI
     */
    const projectTodoRepo = new ProjectTodoRepo(db);
    const projectTodoMapper = new ProjectTodoMapper();
    const projectTodoService = new ProjectTodoService(projectTodoRepo, projectTodoMapper);
    const projectTodoController = new ProjectTodoController(projectTodoService);

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

    /**
     * * PERSONAL PROJECT DI
     */
    const personalProjectRepo = new PersonalProjectRepo(db);
    const personalProjectMapper = new PersonalProjectMapper();
    const personalProjectService = new PersonalProjectService(
        personalProjectRepo,
        personalProjectMapper,
        db,
    );
    const personalProjectController = new PersonalProjectController(personalProjectService);

    return {
        // * === PROJECT TODO classes ===
        projectTodoController,
        projectTodoMapper,
        projectTodoService,
        projectTodoRepo,

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

        // * === PERSONAL PROJECT classes ===
        personalProjectController,
        personalProjectMapper,
        personalProjectService,
        personalProjectRepo,
    };
}

export const di = initDI();
