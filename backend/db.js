// db.js
const mongoose = require('mongoose');
require('dotenv').config(); // For using environment variables

// Function to connect to MongoDB
const connectToMongo = async () => {
    try {
        // MongoDB URI from .env
        const mongoURI = process.env.MONGO_URI;

        // Connecting to the database
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Connected to MongoDB successfully!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit process with failure
    }
};

// Export the function to use it in other files
module.exports = connectToMongo;
