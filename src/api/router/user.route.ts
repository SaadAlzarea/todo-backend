import { Router } from "express";
import { expressAdapter } from "../../adapter";
import { di } from "../../di";
import { userPath } from "../../domain";
import { authMiddleware } from "../../middleware";

export const userRouter = Router();
const { userController } = di;

const { register, login, getAllUsers } = userPath;

userRouter
    .post(register, expressAdapter(userController.registerNewUser.bind(userController)))
    .post(login, expressAdapter(userController.userLogin.bind(userController)));
// .post(getAllUsers, authMiddleware ,expressAdapter(userController.));
