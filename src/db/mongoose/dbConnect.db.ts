import mongoose from "mongoose";
import process from "process";

// const connectDB = async () => {
//     try {
//         const dbUrl = process.env.DB_URL_NO_SQL_MONGO;
//         // console.log("DB URL:", dbUrl);
//         if (!dbUrl) {
//             console.log("No DB URL provided");
//             process.exit(1);
//         }

//         await mongoose.connect(dbUrl);
//         console.log("MongoDB connected successfully");
//     } catch (error) {
//         console.error("MongoDB connection failed:", error);
//         process.exit(1);
//     }
// };

// export default connectDB;

// const connectDB = async () => {
//     try {
//         const dbUrl = process.env.DB_URL_NO_SQL_MONGO;
//         if (!dbUrl) {
//             return console.log("no url to connect");
//         }
//         mongoose.connect(dbUrl);
//         console.log("MongoDB connected successfully");
//     } catch (error) {
//         console.error(" MongoDB connection failed", error);
//     }
// };

// export default connectDB;
