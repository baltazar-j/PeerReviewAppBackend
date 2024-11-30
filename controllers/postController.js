const mongoose = require('mongoose');
const Post = require('../models/postModel');
const User = require('../models/userModel');

// Create a post
const createPost = async (req, res) => {
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
      tags
    });

    await newPost.save();

    // Auto populate author field with the user's username
    const populatedPost = await Post.findById(newPost._id).populate('author', 'username').exec();

    res.status(201).json(populatedPost);

  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('author', 'username email')  // Populate author field with username and email
      .exec();

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
};

// Get posts by a specific author
const getPostsByAuthor = async (req, res) => {
  const { userId } = req.params;

  try {
    const postsByAuthor = await Post.find({ author: userId }).sort({ createdAt: -1 });
    if (!postsByAuthor || postsByAuthor.length === 0) {
      return res.status(404).json({ message: 'No posts found for this user' });
    }
    res.status(200).json(postsByAuthor);
  } catch (error) {
    console.error('Error fetching posts by author:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get author details by post ID
const getAuthorByPostId = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId).populate('author', 'username email bio createdAt');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post.author);
  } catch (error) {
    console.error('Error fetching author information:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostsByAuthor,
  getAuthorByPostId,
};
