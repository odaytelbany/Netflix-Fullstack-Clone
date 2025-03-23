import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(ENV_VARS.MONGO_URI);
        console.log("MongoDB connected successfully" + connection.connection.host);
    } catch (error) {
        console.error("MongoDB connection failed");
        process.exit(1);
    }
}