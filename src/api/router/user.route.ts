import { Router } from "express";
import { expressAdapter } from "../../adapter";
import { di } from "../../di";
import { userPath } from "../../domain";
import { authMiddleware, authorize } from "../../middleware";
import { limiter } from "../../middleware/rateLimit.middleware";

export const userRouter = Router();
const { userController } = di;

const { register, login, getAllUsers } = userPath;

userRouter
    .post(register, limiter, expressAdapter(userController.registerNewUser.bind(userController)))
    .post(login, limiter, expressAdapter(userController.userLogin.bind(userController)))
    .post(
        getAllUsers,
        authMiddleware,
        // authorize("manage", "all"),
        expressAdapter(userController.getAllUserForSuperAdmin.bind(userController)),
    );
