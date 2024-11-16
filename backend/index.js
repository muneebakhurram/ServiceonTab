
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const connectDB = require('./db'); 
const providerRoutes = require('./routes/Provider'); 
const serviceRoutes = require('./routes/Addservices');
require('dotenv').config(); 


const app = express();
const PORT = process.env.PORT || 5000;

// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}



app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));


connectDB();


app.use('/api/Provider', providerRoutes);
app.use('/api/Addservice', serviceRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

});
