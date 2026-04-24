import {
    AssignTodoController,
    AssignTodoRepo,
    AttachmentController,
    AttachmentRepo,
    EmailService,
    GroupController,
    GroupMapper,
    GroupProjectController,
    GroupProjectMapper,
    GroupProjectRepo,
    GroupRepo,
    PersonalProjectController,
    PersonalProjectMapper,
    PersonalProjectRepo,
    ProjectTodoController,
    ProjectTodoMapper,
    ProjectTodoRepo,
    UserController,
    UserMapper,
    UserRepo,
} from "./api";
import { AssignTodoMapper } from "./api/mapper/assignTodo.mapper";

// import { EmailService } from "./api/clients";

import { AssignTodoService } from "./api/services/assignTodo.service";
import { AttachmentService } from "./api/services/attachment.service";
import { GroupService } from "./api/services/group.service";
import { GroupProjectService } from "./api/services/groupProject.service";
import { PersonalProjectService } from "./api/services/personalProject.service";
import { ProjectTodoService } from "./api/services/projectTodo.service";
import { UserService } from "./api/services/user.service";

import { db } from "./db";
import { s3 } from "./integrations/minio/minio.client";
import { MinioService } from "./integrations/minio/minio.service";

export function initDI() {
    //TODO : Dependency Injection ..

    /**
     * * THIRD PARTY
     */
    const emailService = new EmailService();

    /**
     * * STORAGE DI
     */
    const minioService = new MinioService(s3);

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

    /**
     * * GROUP PROJECT DI
     */
    const groupProjectRepo = new GroupProjectRepo(db);
    const groupProjectMapper = new GroupProjectMapper();
    const groupProjectService = new GroupProjectService(groupProjectRepo, groupProjectMapper, db);
    const groupProjectController = new GroupProjectController(groupProjectService);

    /**
     * * ATTACHMENT TODO DI
     */
    const attachmentRepo = new AttachmentRepo();
    const attachmentService = new AttachmentService(minioService, attachmentRepo);
    const attachmentController = new AttachmentController(attachmentService);

    /**
     * * ASSIGN TODO DI
     */
    const assignTodoRepo = new AssignTodoRepo(db);
    const assignTodoMapper = new AssignTodoMapper();
    const assignTodoService = new AssignTodoService(assignTodoRepo, minioService, assignTodoMapper);
    const assignTodoController = new AssignTodoController(assignTodoService);

    return {
        // * === ATTACHMENT classes ===
        attachmentController,
        attachmentService,
        minioService,

        // * === USER classes ===
        userController,
        userMapper,
        userService,
        userRepo,

        // * === PERSONAL PROJECT classes ===
        personalProjectController,
        personalProjectMapper,
        personalProjectService,
        personalProjectRepo,

        // * === PROJECT TODO classes ===
        projectTodoController,
        projectTodoMapper,
        projectTodoService,
        projectTodoRepo,

        // * === GROUP classes ===
        groupController,
        groupMapper,
        groupService,
        groupRepo,

        // * === GROUP PROJECT classes ===
        groupProjectController,
        groupProjectMapper,
        groupProjectService,
        groupProjectRepo,

        // * === ASSIGN TODO classes ===
        assignTodoRepo,
        assignTodoService,
        assignTodoController,
    };
}

export const di = initDI();
