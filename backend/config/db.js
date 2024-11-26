const mongoose = require("mongoose");
require("dotenv").config();
const connectDb = async () => {
  const uri = process.env.CONNECTION_STRING;
  if (!uri) {
    console.error("CONNECTION_STRING is not defined.");
    process.exit(1);
  }

  try {
    const connect = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      "Database connected:",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.error("Database connection error:", err.message);
    process.exit(1);
  }
};

module.exports = { connectDb };
