const express = require('express');
const router = express.Router();
const { createUser, getUserData , verifyToken} = require('../controllers/userController');

// Route to create user (if they don't exist)
router.post('/users', createUser);

// Route to get user data via JWT
router.get('/user', verifyToken, getUserData);

module.exports = router;
