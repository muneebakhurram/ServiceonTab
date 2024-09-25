const express = require('express');
const ConsumerSignup = require('../models/User'); // Adjust the path as necessary
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Regular expression for validating email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Route for creating a new consumer
router.post('/createuser', async (req, res) => {
    const { name, email, password, confirmpassword, phonenumber, address } = req.body;

    // Check if all fields are filled
    if (!name || !email || !password || !confirmpassword || !phonenumber || !address) {
        return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    // Validate email format
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: "Invalid email format!" });
    }

    // Check if the email is already registered
    const existingEmail = await ConsumerSignup.findOne({ email });
    if (existingEmail) {
        return res.status(400).json({ success: false, message: "Email is already registered!" });
    }

    // Check if the phone number is 11 digits long
    if (phonenumber.length !== 11) {
        return res.status(400).json({ success: false, message: "Phone number must be 11 digits long!" });
    }

    // Check if passwords match
    if (password !== confirmpassword) {
        return res.status(400).json({ success: false, message: "Passwords do not match!" });
    }

    // Password security check (example: at least 8 characters)
    if (password.length < 8) {
        return res.status(400).json({ success: false, message: "Password must be at least 8 characters long!" });
    }

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new consumer without confirmpassword
        const consumer = new ConsumerSignup({ name, email, password: hashedPassword, phonenumber, address });
        await consumer.save();

        // Send success response
        res.status(201).json({ success: true, message: "Consumer created successfully!" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Route for logging in a consumer
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if all fields are filled
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required!" });
    }

    // Validate email format
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: "Invalid email format!" });
    }

    try {
        // Check if the email exists
        const consumer = await ConsumerSignup.findOne({ email });
        if (!consumer) {
            return res.status(400).json({ success: false, message: "Email not registered." });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, consumer.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Incorrect password." });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: consumer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send success response with token
        res.status(200).json({ success: true, message: "Login successful!", token });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error." });
    }
});

// Export the router to use it in index.js
module.exports = router;
