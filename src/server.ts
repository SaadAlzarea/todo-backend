import dotenv from "dotenv";
import express from "express";

import process = require("process");

import connectDB from "./db/dbConnect.db";
import router from "./api/router/todo.route";
import { userRouter } from "./api/router/user.route";
import { errorHandler } from "./middleware/errorMiddleware.middleware";
import { authMiddleware } from "./middleware/tokenValidation.middleware";
import { appPaths } from "./domain/paths/appRouter.path";
import cors from "cors";
dotenv.config();

const app = express();

app.use(
    cors({
        origin: "http://localhost:4001",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    }),
);
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
