import { Router } from "express";
import { expressAdapter } from "../../adapter";
import { di } from "../../di";
import { groupProjectPath } from "../../domain/paths/groupProject.path";
import { authMiddleware } from "../../middleware";

export const groupProjectRouter = Router();

const { groupProjectController } = di;
const { createGroupProject, deleteGroupProject } = groupProjectPath;

groupProjectRouter
    .post(
        createGroupProject,
        authMiddleware,
        expressAdapter(groupProjectController.createGroupProject.bind(groupProjectController)),
    )
    .delete(
        deleteGroupProject,
        authMiddleware,
        expressAdapter(groupProjectController.deleteGroupProject.bind(groupProjectController)),
    );
