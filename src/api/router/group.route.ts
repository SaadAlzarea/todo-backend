import { group } from "node:console";
import { Router } from "express";
import { expressAdapter } from "../../adapter";
import { di } from "../../di";
import { groupPath } from "../../domain/paths/group.path";
import { authMiddleware } from "../../middleware";

export const groupRouter = Router();

const { groupController } = di;
const {
    createGroupWithAdminUser,
    addNewMemberToGroup,
    deleteMemberFromGroup,
    getAllGroupMember,
    deleteGroup,
} = groupPath;

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
    )
    .delete(
        deleteMemberFromGroup,
        authMiddleware,
        expressAdapter(groupController.deleteMemberFromGroup.bind(groupController)),
    )
    .post(
        getAllGroupMember,
        authMiddleware,
        expressAdapter(groupController.getAllGroupMemberById.bind(groupController)),
    )
    .delete(
        deleteGroup,
        authMiddleware,
        expressAdapter(groupController.deleteGroup.bind(groupController)),
    );
