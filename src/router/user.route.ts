import { Router } from "express";
import { TodoClass } from "../controller/todo.controller";
import { Register } from "../controller/register.controller";

export const userRouter = Router();

const registerController = new Register();

userRouter
    .post("/register", registerController.registerNewUser)
    .post("/login", registerController.login)
    .post("/all-user", registerController.getAllUser);
