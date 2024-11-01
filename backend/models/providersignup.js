// models/providersignup.js
const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    companyCode: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    cnicFront: { type: String, required: true },
    cnicBack: { type: String, required: true },
    policeCertificate: { type: String, required: true },
    isVerified: { type: Boolean, default: false } // New field for email verification
});

module.exports = mongoose.model('ProviderSignup', providerSchema);
