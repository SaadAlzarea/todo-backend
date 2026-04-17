import dotenv from "dotenv";
import express from "express";

import process = require("process");

import cors from "cors";
import { connectDB_postgres } from "../drizzle.config";
import { personalProjectRouter, todoRouter, userRouter } from "./api";
import { groupRouter } from "./api/router/group.route";
// import connectDB from "./db/mongoose/dbConnect.db";
import setupSwagger from "./docs/swagger/swaggerDocs.swagger";
import { appPaths } from "./domain";
import { authMiddleware, errorHandler } from "./middleware";

dotenv.config();
export const app = express();

// * SWAGGER
setupSwagger(app);

// * CORS => access
app.use(
    cors({
        origin: "http://localhost:4001",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    }),
);
app.use(express.json());

// * DATABASE;
connectDB_postgres();

// * MIDDLEWARE
app.use(errorHandler);

// * ROUTER
const { user, todo, group, personalProject } = appPaths;
app.use(todo, authMiddleware, todoRouter);
app.use(user, userRouter);
app.use(group, authMiddleware, groupRouter);
app.use(personalProject, authMiddleware, personalProjectRouter);

// * LISTENER
const PORT = Number(process.env.PORT);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
