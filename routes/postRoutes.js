const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Post = require('../models/postModel');
const User = require('../models/userModel');
const { createPost, getAllPosts } = require('../controllers/postController.js');

// Create post route
router.post('/', async (req, res) => {
  console.log('Request body:', req.body);

  const { title, description, author, date, tags } = req.body;

  if (!title || !description || !author) {
    return res.status(400).json({ message: 'Title, description, and author are required.' });
  }

  try {
    // Find user by username to get the author ObjectId
    const user = await User.findOne({ username: author });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new post
    const newPost = new Post({
      title,
      description,
      author: user._id,
      date: date || new Date(),
    });

    await newPost.save();

    // Auto make author field with the user's username
    const populatedPost = await Post.findById(newPost._id).populate('author', 'username').exec();

    res.status(201).json(populatedPost);

  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all posts route
router.get('/', getAllPosts);

module.exports = router;
