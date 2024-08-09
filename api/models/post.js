const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  message: {type: String},
  userId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.
const PostSchema = new mongoose.Schema({
  message: {type: String},
  firstName: { type: String},
  lastName: { type: String },
  userId: { type: String  },
  date: { type: Date, default: Date.now },
  likes: {type: Array },
  comments: {type: [CommentSchema] }
});

// We use the Schema to create the Post model. Models are classes which we can
// use to construct entries in our Database.
const Post = mongoose.model("Post", PostSchema);


// These lines will create a test post every time the server starts.
// You can delete this once you are creating your own posts.
// const dateTimeString = new Date().toLocaleString("en-GB");
// new Post({ message: `Test message, created at ${dateTimeString}` }).save();

module.exports = Post;
