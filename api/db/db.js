const mongoose = require("mongoose");

const connectToDatabase = () => {
  const mongoDbUrl = process.env.MONGO_URL;

  if (!mongoDbUrl) {
    console.error(
      "No MongoDB url provided. Make sure there is a MONGO_URL environment variable set. See the readme for more details."
    );
    throw new Error("No connection string provided");
  }

  mongoose.connect(mongoDbUrl);
  const db = mongoose.connection;

  db.on("error", (err) => {
    console.error(err);
  });

  db.on("open", () => {
    console.log("Successfully connected to MongoDB");
  });
};

module.exports = { connectToDatabase };
