const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/url_shortener");
    console.log("MongoDB connected successfully");
  } catch (error) {
    return console.error("MongoDB connection error:", error);
  }
};

module.exports = connectDB;
