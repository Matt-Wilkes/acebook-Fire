const Post = require("../models/post");
const User = require("../models/user")
const { generateToken } = require("../lib/token");

const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  const token = generateToken(req.user_id);

  res.status(200).json({ posts: posts, token: token });
};

const createPost = async (req, res) => {
  const user = await User.findOne({ _id: req.user_id });
  console.log(user.firstName)
  console.log(user.lastName)
  
  const post = new Post({
    message: req.body.message,
    userId: req.body.userId,
    firstName: user.firstName,
    lastName: user.lastName,
    likes:  req.body.likes,});

  post.save();



  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "Post created", token: newToken });
};

const updatePost = async (req, res) => {
  console.log(`1${req.body.id}`)
  console.log(req.body.likes)
    //const post = await Post.findById(req.params.id);
  await Post.findOneAndUpdate(
    //console.log(`2${req.body.id}`),
    { _id: req.body.id },
    { 
      $set: {
        likes: req.body.likes,
        comments: req.body.comments
      },
    },
    { new: false });
  res.status(201).json({ message: "Post updated" });

}

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  updatePost: updatePost,
};

module.exports = PostsController;
