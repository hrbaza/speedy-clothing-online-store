import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("✅ DB Connected"));
  mongoose.connection.on("error", (err) => console.error("❌ DB Connection Error:", err.message));
  mongoose.connection.on("disconnected", () => console.warn("⚠️ DB Disconnected"));

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn("⚠️ MONGODB_URI is not provided in environment variables.");
    return;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 10000,
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    console.warn("⚠️ Backend will continue running. Please verify your MONGODB_URI in backend/.env.");
  }
};

export default connectDB;
