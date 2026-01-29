import { Router } from "express";
import { TodoClass } from "../controller/todo.controller";
import { User } from "../controller/user.controller";
import { userPath } from "../paths/user.path";

export const userRouter = Router();

const userController = new User();

const { register, login, getAllUsers } = userPath;

userRouter
    .post(register, userController.registerNewUser)
    .post(login, userController.login)
    .post(getAllUsers, userController.getAllUser);
