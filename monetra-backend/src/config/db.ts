import mongoose from "mongoose";

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    console.error("❌ MONGODB_URI is missing. Please check your .env file.");

    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI);

    console.log("✅ MongoDB Connected");
  } catch (error: unknown) {
    console.error("❌ Database connection failed:", error);

    process.exit(1);
  }
};

export default connectDB;
