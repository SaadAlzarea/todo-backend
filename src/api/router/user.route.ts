import { Router } from "express";
import { userPath } from "../../domain/paths/user.path";
import { di } from "../../di";
import { expressAdapter } from "../../adapter/express.adapter";

export const userRouter = Router();
const { userController } = di;

const { register, login } = userPath;

userRouter
    .post(register, expressAdapter(userController.registerNewUser.bind(userController)))
    .post(login, expressAdapter(userController.userLogin.bind(userController)));
