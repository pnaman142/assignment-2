const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");

//@desc Get all posts
//@route GET /posts
//@access private
const getPosts = asyncHandler(async (req, res) => {
  const Post = await Post.find({ user_id: req.user.id });
  res.status(200).json(posts);
});

//@desc Create post
//@route Post /posts
//@access private
const createPost = asyncHandler(async (req, res) => {
  const { title, body, image } = req.body;
  if (!title || !body || !image) {
    res.status(400).json({ message: "All fields are mandatory!!" });
  }
  const post = await Post.create({
    title,
    body,
    image,
    user_id: req.user.id,
  });
  res.status(201).json(post);
});

//@desc Update post with id
//@route PUT /posts/:id
//@access private
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404).json({ message: "Post not found!!" });
  }
  if (post.user_id.toString() !== req.user.id) {
    res.status(403).json({
      message: "User don't have permission to update posts.",
    });
  }
  const updatedpost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ status: "success" });
});

//@desc Delete post with id
//@route DELETE /posts/:id
//@access private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404).json({ message: "Post not found!!" });
  }
  if (post.user_id.toString() !== req.user.id) {
    res.status(403).json({
      message: "User don't have permission to delete posts.",
    });
  }
  await Post.deleteOne({ _id: req.params.id });
  res.status(200).json({ status: "Successfully deleted" });
});

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
};
