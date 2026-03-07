import dotenv from "dotenv";
import express from "express";
import process = require("process");
import connectDB from "./db/dbConnect.db";
import cors from "cors";
import { todoRouter, userRouter } from "./api";
import { appPaths } from "./domain";
import { errorHandler, authMiddleware } from "./middleware";
import setupSwagger from "./docs/swagger/swaggerDocs.swagger";
dotenv.config();
export const app = express();
setupSwagger(app);
app.use(
    cors({
        origin: "http://localhost:4000",
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
app.use(todo, authMiddleware, todoRouter);
app.use(user, userRouter);

// listener
const PORT = Number(process.env.PORT);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
