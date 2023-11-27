const express = require("express");
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.post("/", async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).send("User with this username or email already exists.");
        }

        const lastUser = await User.findOne().sort({ user_id: -1 }).limit(1);
        const lastUserId = lastUser ? lastUser.user_id : 0;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            user_id: lastUserId + 1,
            username,
            password: hashedPassword,
            email
        });

        // Save the new user to the database
        await newUser.save();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ message: "Registration successful" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
