const express = require('express');
const multer = require('multer');
const ProviderSignup = require('../models/providersignup');
const path = require('path');
const bcrypt = require('bcryptjs'); 
const nodemailer = require('nodemailer');
require('dotenv').config();
const fs = require('fs');

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Save files in the 'uploads' directory
      cb(null, path.join(__dirname, '../uploads/'));
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
  
  // Route to handle file upload and provider signup
  router.post('/signup', upload.fields([
    { name: 'cnicFront', maxCount: 1 },
    { name: 'cnicBack', maxCount: 1 },
    { name: 'policeCertificate', maxCount: 1 }
  ]), async (req, res) => {
    const { name, phone, companyCode, email, password, address } = req.body;
    const cnicFront = req.files['cnicFront'] ? `/uploads/cnicFront/${req.files['cnicFront'][0].filename}` : null;
    const cnicBack = req.files['cnicBack'] ? `/uploads/cnicBack/${req.files['cnicBack'][0].filename}` : null;
    const policeCertificate = req.files['policeCertificate'] ? `/uploads/policeCertificate/${req.files['policeCertificate'][0].filename}` : null;
  
  
    try {
      // Check if the email already exists in the database
      const existingProvider = await ProviderSignup.findOne({ email });
      if (existingProvider) {
        return res.status(400).json({ success: false, message: "Email is already registered." });
      }
  
      // Save provider info to the database
      const newProvider = new ProviderSignup({
        name,
        phone,
        companyCode,
        email,
        password,
        address,
        cnicFront,
        cnicBack,
        policeCertificate
      });
      
      await newProvider.save();
      res.status(201).json({ success: true, message: "Provider signup successful!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error signing up provider." });
    }
  });
  

 



module.exports = router;
