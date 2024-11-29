const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {
    createPost,
    getAllPosts
} = require('../controllers/postController.js');

// Temporary route to bypass authentication for testing
router.post('/create', (req, res) => {
  console.log(req);
  req.user = { id: new mongoose.Types.ObjectId('6746e4aa69aeaabd4707de03') };
  createPost(req, res);
});

router.post('/', (req, res) => {
  console.log(req.body);
});

//Get all posts in descending order
router.get('/', getAllPosts);


module.exports = router;

