import mongoose from "mongoose";

// Connect to the MongoDB database
const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database Connected")
    );

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "buildaura", // specify database name explicitly
    });
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // stop server if DB fails
  }
};

export default connectDB;
