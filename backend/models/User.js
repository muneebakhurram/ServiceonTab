const mongoose = require('mongoose'); // Import mongoose

// Define the consumer schema
const ConsumerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phonenumber: { type: String, required: true },
    address: { type: String, required: true },
    verified: { type: Boolean, default: false }, // Add this line
    verificationToken: { type: String } // Add this line to store the token
});

// Create the model from the schema
const ConsumerSignup = mongoose.model('ConsumerSignup', ConsumerSchema);

// Export the model
module.exports = ConsumerSignup;
