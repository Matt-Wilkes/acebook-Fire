const mongoose = require("mongoose");
const { connectToDatabase } = require("../db/db");

beforeAll(async () => {
  const url = process.env.TEST_MONGODB_URL;
  await connectToDatabase(url);
});

afterAll(async () => {
  await mongoose.connection.close(true);
});
