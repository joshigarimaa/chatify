const mongoose = require("mongoose");
const ENV = require("./env");
const connectDB = async () => {
  try {
    const { MONGODB_URI } = ENV;
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

module.exports = connectDB;
