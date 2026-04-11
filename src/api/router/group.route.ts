import { Router } from "express";
import { expressAdapter } from "../../adapter";
import { di } from "../../di";
import { groupPath } from "../../domain/paths/group.path";
import { authMiddleware } from "../../middleware";

export const groupRouter = Router();

const { groupController } = di;
const { createGroupWithAdminUser, addNewMemberToGroup } = groupPath;

groupRouter
    .post(
        createGroupWithAdminUser,
        authMiddleware,
        expressAdapter(groupController.createGroup.bind(groupController)),
    )
    .post(
        addNewMemberToGroup,
        authMiddleware,
        expressAdapter(groupController.addedNewMemberToGroup.bind(groupController)),
    );
