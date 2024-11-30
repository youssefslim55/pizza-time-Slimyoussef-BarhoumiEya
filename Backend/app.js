const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/UserRoute');
dotenv.config();
connectDB();
const app = express();

// Middleware
app.use(cors()); // Pour autoriser les requêtes cross-origin
app.use(express.json()); // Pour analyser les requêtes JSON

// Routes
app.use('/api/user', authRoutes);

const port = process.env.PORT;
app.listen(port,()=> console.log(`server run in port ${port}`));

