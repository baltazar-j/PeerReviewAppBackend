const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {
    createPost,
    getAllPosts
} = require('../controllers/postController.js');

// Temporary route to bypass authentication for testing
router.post('/create', (req, res) => {
  // Hardcode the authorId for now (use the test user's _id from MongoDB)
  req.user = { id: new mongoose.Types.ObjectId('6746e4aa69aeaabd4707de03') }; // Use the test user's _id directly here
  createPost(req, res);
});

//Get all posts in descending order
router.get('/', getAllPosts);


module.exports = router;

