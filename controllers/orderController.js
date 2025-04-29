const Order = require('../models/Order');

// Crear nueva orden
const createOrder = async (req, res) => {
    const { products, total } = req.body;

    try {
        const order = await Order.create({
            userId: req.user._id,
            products,
            total
        });
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todas las órdenes del usuario autenticado
const getOrders = async (req, res) => {
    const orders = await Order.find({ userId: req.user._id }).populate('products');
    res.json(orders);
};

// Obtener detalle de una orden por ID
const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id).populate('products');

    if (order && order.userId.equals(req.user._id)) {
        res.json(order);
    } else {
        res.status(404).json({ message: 'Orden no encontrada o acceso denegado' });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrderById
};