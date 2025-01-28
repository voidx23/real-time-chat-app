import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Optional: Set timeout for server selection
        });
        console.log(`Connected to MongoDB: ${db.connection.host}, Database: ${db.connection.name}`);
    } catch (error) {
        console.error("Database connection error:", error.message);
        process.exit(1); // Exit the process with failure
    }
};
