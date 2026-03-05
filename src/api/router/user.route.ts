import { Router } from "express";
import { expressAdapter } from "../../adapter";
import { di } from "../../di";
import { userPath } from "../../domain";

export const userRouter = Router();
const { userController } = di;

const { register, login } = userPath;

userRouter
    .post(register, expressAdapter(userController.registerNewUser.bind(userController)))
    .post(login, expressAdapter(userController.userLogin.bind(userController)));
