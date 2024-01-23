const mongoose = require("mongoose");

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database
const PostSchema = new mongoose.Schema({
  message: String,
});

// We create the Post model from the schema. Models are classes which we can
// use to construct entries in our Database.
const Post = mongoose.model("Post", PostSchema);

// This line will create a test post every time the server starts.
// You can delete this line when you are creating your own posts.
new Post({ message: Date.now().toLocaleString() + " test message" }).save();

module.exports = Post;
