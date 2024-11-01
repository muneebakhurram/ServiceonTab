const express = require('express');
const multer = require('multer');
const ProviderSignup = require('../models/providersignup');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Make sure to require jwt
require('dotenv').config(); // Load environment variables from .env file

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpg|jpeg|png|pdf/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb('Error: Only .jpg, .jpeg, .png images and .pdf files are allowed!');
    }
});

// Route to create a provider signup with file uploads
router.post('/signup', upload.fields([
    { name: 'cnicFront', maxCount: 1 },
    { name: 'cnicBack', maxCount: 1 },
    { name: 'policeCertificate', maxCount: 1 }
]), async (req, res) => {
    const { name, phone, companyCode, email, password, address } = req.body;
    const cnicFront = req.files['cnicFront'] ? req.files['cnicFront'][0].path : null;
    const cnicBack = req.files['cnicBack'] ? req.files['cnicBack'][0].path : null;
    const policeCertificate = req.files['policeCertificate'] ? req.files['policeCertificate'][0].path : null;

    try {
        // Check if the email already exists in the database
        const existingProvider = await ProviderSignup.findOne({ email });
        if (existingProvider) {
            return res.status(400).json({ success: false, message: "Email is already registered." });
        }

        const saltRounds = 10; // You can adjust the salt rounds for hashing
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new provider signup
        const newProvider = new ProviderSignup({
            name,
            phone,
            companyCode,
            email,
            password: hashedPassword,
            address,
            cnicFront,
            cnicBack,
            policeCertificate,
            isVerified: true // Set to true as no verification is needed
        });

        await newProvider.save();

        res.status(201).json({ success: true, message: 'Request Submit, Get an email within 2 Days!' });
    } catch (error) {
        console.error('Error creating provider signup:', error.message);
        res.status(500).json({ success: false, message: 'Failed to create provider signup.' });
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