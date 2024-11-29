const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Middleware to verify the JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) return res.status(403).json({ message: 'No token provided' });

    jwt.verify(token, process.env.AUTH0_PUBLIC_KEY, async (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });

        req.userId = decoded.sub; // Save the user ID from the JWT
        next();
    });
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
                bio: "Bio is empty",
            });

            await user.save();
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

// Route to get user data (username and bio)
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

module.exports = { createUser, getUserData , verifyToken};
