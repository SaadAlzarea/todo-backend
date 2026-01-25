import dotenv from "dotenv";
import express from "express";

import process = require("process");

import connectDB from "./db/dbConnect.db";
import router from "./router/router.router";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use("/todo", router);

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
