const express = require('express');
const {
  createOrder,
  getOrders,
  getOrderById
} = require('../controllers/orderController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// Crear nueva orden (autenticado)
router.post('/', protect, createOrder);

// Obtener órdenes del usuario autenticado
router.get('/', protect, getOrders);

// Obtener detalle de una orden por ID
router.get('/:id', protect, getOrderById);

module.exports = router;