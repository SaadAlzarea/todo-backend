import dotenv from "dotenv";
import express from "express";

import process = require("process");

import cors from "cors";
import { connectDB_postgres } from "../drizzle.config";
import { todoRouter, userRouter } from "./api";
import { groupRouter } from "./api/router/group.route";
// import connectDB from "./db/mongoose/dbConnect.db";
import setupSwagger from "./docs/swagger/swaggerDocs.swagger";
import { appPaths } from "./domain";
import { authMiddleware, errorHandler } from "./middleware";

dotenv.config();
export const app = express();
setupSwagger(app);
app.use(
    cors({
        origin: "http://localhost:4001",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    }),
);
app.use(express.json());

// connectDB();
connectDB_postgres();

//middleware
app.use(errorHandler);

// router
const { user, todo, group } = appPaths;
app.use(todo, authMiddleware, todoRouter);
app.use(user, userRouter);
app.use(group, authMiddleware, groupRouter);

// listener
const PORT = Number(process.env.PORT);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
