const express = require('express');
const multer = require('multer');
const ProviderSignup = require('../models/providersignup');
const path = require('path');
const router = express.Router();


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
    limits: { fileSize: 10 * 1024 * 1024 }, 
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
   
        const existingProvider = await ProviderSignup.findOne({ email });
        if (existingProvider) {
            return res.status(400).json({ success: false, message: "Email is already registered." });
        }

       
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
        res.status(201).json({ success: true, message: 'Provider signup created successfully!' });
    } catch (error) {
        console.error('Error creating provider signup:', error.message);
        res.status(500).json({ success: false, message: 'Failed to create provider signup.' });
    }
});

module.exports = router;
