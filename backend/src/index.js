import express from "express";
import authRoutes  from "./routes/authRoute.js";
import messageRoute from "./routes/messageRoute.js"
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config()

const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoute );

app.listen(5001, () => {
    console.log(`server is running on ${PORT}`)
    connectDB();
});