const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/userRoutes');

dotenv.config();
connectDB();
const app = express();

// Middleware
app.use(cors()); // Pour autoriser les requêtes cross-origin
app.use(express.json()); // Pour analyser les requêtes JSON

// Routes
app.use('/api/user', authRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});