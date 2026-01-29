import dotenv from "dotenv";
import express from "express";

import process = require("process");

import connectDB from "./db/dbConnect.db";
import router from "./router/todo.route";
import { userRouter } from "./router/user.route";
import { errorHandler } from "./middleware/errorMiddleware.middleware";
import { authMiddleware } from "./middleware/tokenValidation.middleware";
import { appPaths } from "./paths/appRouter.path";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();
//middleware
app.use(errorHandler);

// router
const { user, todo } = appPaths;

app.use(todo, authMiddleware, router);
app.use(user, userRouter);

// listener
const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
