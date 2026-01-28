import { Router } from "express";
import { TodoClass } from "../controller/todo.controller";
import { User } from "../controller/user.controller";

export const userRouter = Router();

const userController = new User();

userRouter
    .post("/register", userController.registerNewUser)
    .post("/login", userController.login)
    .post("/all-user", userController.getAllUser);
