const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Call dotenv.config() before accessing environment variables
dotenv.config();

// Now the uri should be loaded correctly
const uri = process.env.URI_MONDODB;

const connectDB = async () => {
    try {
        if (!uri) {
            console.error('MongoDB URI is not defined');
            return;
        }

        await mongoose.connect(uri);
        console.log('Established a connection to the database');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
