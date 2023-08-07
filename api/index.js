require("dotenv").config();

const app = require("./app.js");
const { connectToDatabase } = require("./db/db.js");

connectToDatabase();

// Start listening for HTTP Requests
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Now listening on port", port);
});
