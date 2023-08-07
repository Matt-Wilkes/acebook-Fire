const Post = require("../models/post");
const TokenGenerator = require("../lib/generateToken");

const getAllPosts = (req, res) => {
  Post.find((err, posts) => {
    if (err) {
      throw err;
    }
    const token = TokenGenerator.jsonwebtoken(req.user_id);
    res.status(200).json({ posts: posts, token: token });
  });
};

const createPost = (req, res) => {
  const post = new Post(req.body);
  post.save((err) => {
    if (err) {
      throw err;
    }

    const token = TokenGenerator.jsonwebtoken(req.user_id);
    res.status(201).json({ message: "OK", token: token });
  });
};

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
};

module.exports = PostsController;
