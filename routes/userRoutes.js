const express = require('express');
const router = express.Router();
const { createUser, getUserData, verifyToken } = require('../controllers/userController');
const User = require('../models/userModel.js');

router.post('/users', createUser);

router.put('/users', async (req, res) => {
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
});

router.get('/user', verifyToken, getUserData);

module.exports = router;
