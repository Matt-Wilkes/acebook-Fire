const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.getAllPosts);
router.post("/", PostsController.createPost);
router.put("/add-like", PostsController.updatePost);
router.post("/add-comment", PostsController.updatePostComments);

module.exports = router;
