const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, getPostsByAuthor, getAuthorByPostId } = require('../controllers/postController');

// Create post route
router.post('/', createPost);

// Get all posts route
router.get('/', getAllPosts);

// Get posts by author route
router.get('/author/:userId/posts', getPostsByAuthor);

// Get author info by post ID route
router.get('/:postId/author', getAuthorByPostId);

module.exports = router;
