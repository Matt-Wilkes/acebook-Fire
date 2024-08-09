const Post = require("../models/post");
const User = require("../models/user");
const { generateToken } = require("../lib/token");

const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  const token = generateToken(req.user_id);

  res.status(200).json({ posts: posts, token: token });
};

const createPost = async (req, res) => {
  const user = await User.findOne({ _id: req.user_id });
  console.log(user.firstName);
  console.log(user.lastName);

  const post = new Post({
    message: req.body.message,
    userId: req.body.userId,
    firstName: user.firstName,
    lastName: user.lastName,
    likes: req.body.likes,
    comments: req.body.comments,
  });

  post.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "Post created", token: newToken });
};

const updatePost = async (req, res) => {
  await Post.findOneAndUpdate(
    { _id: req.body.id },
    {
      $set: {
        likes: req.body.likes,
      },
    },
    { new: false }
  );
  res.status(201).json({ message: "Post updated" });
};

const updatePostComments = async (req, res) => {
  const user = await User.findOne({ _id: req.user_id });

  await Post.findOneAndUpdate(
    { _id: req.body.id },
    {
      $push: {
        comments: {
          message: req.body.comments[0].message,
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
    },
    { new: true }
  );
  res.status(201).json({ message: "Post updated" });
};



const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  updatePost: updatePost,
  updatePostComments: updatePostComments,
};

module.exports = PostsController;
