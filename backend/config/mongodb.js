import mongoose from "mongoose";

mongoose.connection.on("connected", () => console.log("✅ DB Connected"));
mongoose.connection.on("error", (err) => console.error("❌ DB Connection Error:", err.message));
mongoose.connection.on("disconnected", () => console.warn("⚠️ DB Disconnected"));

let connecting = null;

// Connects to MongoDB, or reuses the existing connection.
// Safe to call on every request: if an earlier attempt failed it simply tries again,
// so a server that started while the database was unreachable recovers on its own.
// Resolves to true when connected, false otherwise.
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return true;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn("⚠️ MONGODB_URI is not provided in environment variables.");
    return false;
  }

  if (!connecting) {
    connecting = mongoose
      .connect(uri, { serverSelectionTimeoutMS: 8000 })
      .then(() => true)
      .catch((error) => {
        console.error("❌ Failed to connect to MongoDB:", error.message);
        return false;
      })
      .finally(() => {
        connecting = null;
      });
  }

  return connecting;
};

export default connectDB;
