const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.URI_MONDODB;

    if (!uri) {
      throw new Error('MongoDB URI is not defined in the .env file');
    }

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;





/*const mongoose = require('mongoose');
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

module.exports = connectDB;*/
