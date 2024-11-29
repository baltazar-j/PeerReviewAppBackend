const mongoose = require('mongoose');
const Post = require('../models/postModel.js');  // Assuming this is the correct path to your Post model

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

    // Save the post to the database
    await newPost.save();

    return res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Error creating post" });
  }
};

const getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: -1 }); // Fetch all posts, sorted by newest first
      res.status(200).json(posts); // Send posts as JSON
    } catch (error) {
      res.status(500).json({ message: 'Error fetching posts', error: error.message });
    }
};


module.exports = {
    createPost,
    getAllPosts
};
