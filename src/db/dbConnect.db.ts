import mongoose from "mongoose";
import process from "process";

const connectDB = async () => {
	try {
		const dbUrl = process.env.DB_URL;
		if (!dbUrl) {
			return console.log("no url to connect");
		}
		mongoose.connect(dbUrl);
		console.log("MongoDB connected successfully");
	} catch (error) {
		console.error(" MongoDB connection failed", error);
	}
};

export default connectDB;
