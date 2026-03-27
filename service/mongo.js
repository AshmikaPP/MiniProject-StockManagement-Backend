import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongourl = process.env.MONGODBURL;

export const connectdb = async () => {
  try {
    const conn = await mongoose.connect(mongourl);
    console.log("MongoDB connected:", conn.connection.host);
  } catch (error) {
    console.log("MongoDB connection error:", error.message);
    process.exit(1);
  }
};