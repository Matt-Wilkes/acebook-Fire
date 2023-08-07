const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
});

const Post = mongoose.model("Post", PostSchema);

new Post({ message: Date.now().toLocaleString() + " test message" }).save();

module.exports = Post;
