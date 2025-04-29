require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);

// Swagger
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(3000, () => console.log('Servidor en puerto 3000')))
    .catch(err => console.log(err))