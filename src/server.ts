import dotenv from "dotenv";
import express from "express";

import process = require("process");

import connectDB from "./db/dbConnect.db";
import router from "./router/todo.route";
import { userRouter } from "./router/user.route";
import { errorHandler } from "./middleware/errorMiddleware.middleware";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use("/todo", router);
app.use("/user", userRouter);
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
