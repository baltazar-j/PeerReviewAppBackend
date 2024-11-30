const express = require('express');
const router = express.Router();
const { createUser, getUserData, verifyToken, updateUser, getUserByUsername, getPostsByAuthor } = require('../controllers/userController');

// Create user route
router.post('/users', createUser);

// Update user route
router.put('/users', updateUser);

// Get user by username
router.get('/username/:username', getUserByUsername);

// Get posts by author (userId)
router.get('/:userId/author/posts', getPostsByAuthor);

// Get user data (username and bio)
router.get('/user', verifyToken, getUserData);

module.exports = router;
