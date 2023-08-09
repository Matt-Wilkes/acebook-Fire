const mongoose = require("mongoose");

const connectToDatabase = async (url) => {
  const mongoDbUrl = url || process.env.MONGO_URL;

  if (!mongoDbUrl) {
    console.error(
      "No MongoDB url provided. Make sure there is a MONGO_URL environment variable set. See the readme for more details."
    );
    throw new Error("No connection string provided");
  }

  await mongoose.connect(mongoDbUrl);
  if (process.env.NODE_ENV !== "test") {
    console.log("Successfully connected to MongoDB");
  }
};

module.exports = { connectToDatabase };
