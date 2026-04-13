const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({
    path: '.env',
});

const authRoutes = require('./routes/auth.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta base (IMPORTANTE para Render)
app.get('/', (req, res) => {
    res.json({ message: 'API funcionando 🚀' });
});

// Rutas
app.use('/api/auth', authRoutes);

// Puerto
const PORT = process.env.PORT || 5000;

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB conectado');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en puerto ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error conectando MongoDB:', err.message);
        process.exit(1);
    });