const User = require('../models/userModel');
const Post = require('../models/postModel');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

// Middleware to verify the JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }

    next();
};

// Create or find a user
const createUser = async (req, res) => {
    try {
        const { username, email, auth0Id } = req.body;

        let user = await User.findOne({ auth0Id });
        if (!user) {
            user = new User({
                username,
                email,
                auth0Id,
                bio: "Bio is empty",  // Default bio
            });

            await user.save();
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

// Update user data
const updateUser = async (req, res) => {
    const { email, bio } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required to update user information.' });
    }

    try {
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { bio },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'User updated successfully.', user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Get user by username
const getUserByUsername = async (req, res) => {
    try {
        const { username } = req.params; 
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get posts by userId (author)
const getPostsByAuthor = async (req, res) => {
    try {
        const { userId } = req.params;

        const postsByAuthor = await Post.find({ author: userId }).sort({ createdAt: -1 });

        if (!postsByAuthor.length) {
            return res.status(404).json({ message: 'No posts found for this user' });
        }

        res.status(200).json(postsByAuthor);
    } catch (error) {
        console.error('Error fetching posts by author:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get user data (username and bio)
const getUserData = async (req, res) => {
    try {
        const user = await User.findOne({ auth0Id: req.userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            username: user.username,
            bio: user.bio,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    createUser,
    updateUser,
    getUserByUsername,
    getPostsByAuthor,
    getUserData,
    verifyToken
};
