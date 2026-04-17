import { todo } from "node:test";
import { Router } from "express";
import { expressAdapter } from "../../adapter";
import { di } from "../../di";
import { todoPath } from "../../domain";
import { personalProjectPath } from "../../domain/paths/personalProject.path";
import { authMiddleware, authorize } from "../../middleware";

export const personalProjectRouter = Router();

const { personalProjectController } = di;
const { createPersonalProject, deletePersonalProject, getAllPersonalProject } = personalProjectPath;

personalProjectRouter

    .post(
        createPersonalProject,
        authMiddleware,
        expressAdapter(
            personalProjectController.createPersonalProject.bind(personalProjectController),
        ),
    )
    .delete(
        deletePersonalProject,
        authMiddleware,
        expressAdapter(
            personalProjectController.deletePersonalProject.bind(personalProjectController),
        ),
    )
    .post(
        getAllPersonalProject,
        authMiddleware,
        expressAdapter(
            personalProjectController.getAllPersonalProject.bind(personalProjectController),
        ),
    );
