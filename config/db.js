import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // ✅ .env file ko load karna zaroori hai

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    process.exit(1); // Server crash kar dega agar DB connect nahi hua
  }
};

export default connectDB;
