const mongoose = require('mongoose');
const Post = require('../models/postModel.js');

const createPost = async (req, res) => {
  try {
    const { title, description, author } = req.body;

    const postId = new mongoose.Types.ObjectId();

    // Create a new post
    const newPost = new Post({
      postId: postId.toString(),
      title,
      description,
      author,
    });

    await newPost.save();

    return res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Error creating post" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('author', 'username email')  // Fill author with username and email from the User model
      .exec();

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
};



module.exports = {
    createPost,
    getAllPosts
};
