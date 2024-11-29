const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true
    }, 
    title: { 
        type: String,
        required: true
    },
    description: { 
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    createdAt: {
        type: Date,
        default: Date.now 
    },
  });
  

module.exports = mongoose.model('Post', postSchema);