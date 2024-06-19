const mongoose = require("mongoose");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.laccu1y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      dbName: "ChatApp",
    });
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.error("MongoDB connection error: ", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
