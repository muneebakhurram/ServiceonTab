// Auth.js
const express = require('express');
const ConsumerSignup = require('../models/User'); // Adjust the path to your User model
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
require('dotenv').config(); // To load environment variables from .env file

const router = express.Router();
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address from .env
    pass: process.env.EMAIL_PASS  // Your Gmail app-specific password from .env
  }
});

// Route for creating a new consumer
router.post('/createuser', async (req, res) => {
  const { name, email, password, confirmpassword, phonenumber, address } = req.body;

  // Basic validation checks
  if (!name || !email || !password || !confirmpassword || !phonenumber || !address) {
    return res.status(400).json({ success: false, message: "All fields are required!" });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Invalid email format!" });
  }
  const existingEmail = await ConsumerSignup.findOne({ email });
  if (existingEmail) {
    return res.status(400).json({ success: false, message: "Email is already registered!" });
  }
  if (phonenumber.length !== 11) {
    return res.status(400).json({ success: false, message: "Phone number must be 11 digits long!" });
  }
  if (password !== confirmpassword) {
    return res.status(400).json({ success: false, message: "Passwords do not match!" });
  }
  if (password.length < 8) {
    return res.status(400).json({ success: false, message: "Password must be at least 8 characters long!" });
  }

  try {
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new consumer with email verification status set to false
    const consumer = new ConsumerSignup({
      name,
      email,
      password: hashedPassword,
      phonenumber,
      address,
      isVerified: false // Email verification flag
    });

    await consumer.save();

    // Generate email verification link
    const verificationLink = `http://localhost:5000/api/Auth/verify/${consumer._id}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email',
      text: `Hi ${name},\n\nPlease verify your email by clicking on the following link: ${verificationLink}\n\nBest regards,\nYour Service on Tab Team`
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(201).json({ success: true, message: "Consumer created successfully! A verification email has been sent." });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Route for email verification
router.get('/verify/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the consumer by ID
    const consumer = await ConsumerSignup.findById(id);

    if (!consumer) {
      return res.status(400).json({ success: false, message: "User not found." });
    }

    // Check if already verified
    if (consumer.isVerified) {
      return res.status(400).json({ success: false, message: "User is already verified." });
    }

    // Mark the user as verified
    consumer.isVerified = true;
    await consumer.save();

    // Redirect to login page after successful verification
    res.redirect('http://localhost:3000/login'); // Assuming your frontend login page is at /login
  } catch (error) {
    res.status(400).json({ success: false, message: "Verification failed." });
  }
});

// Route for user login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required." });
  }

  try {
    // Find the consumer by email
    const consumer = await ConsumerSignup.findOne({ email });
    if (!consumer) {
      return res.status(400).json({ success: false, message: "User not found." });
    }

    // Check if the user is verified
    if (!consumer.isVerified) {
      return res.status(400).json({ success: false, message: "Email not verified." });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, consumer.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials." });
    }

    // Optionally, generate a JWT token here if you're using authentication tokens
    // const token = jwt.sign({ id: consumer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with success
    res.status(200).json({ success: true, message: "Login successful!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;
