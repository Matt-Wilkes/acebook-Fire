const mongoose = require("mongoose");
const { connectToDatabase } = require("../db/db");

beforeAll(async () => {
  await connectToDatabase();
});

afterAll(async () => {
  await mongoose.connection.close(true);
});
