const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect, admin } = require('../middlewares/auth');

const router = express.Router();

// Listar productos
router.get('/', getProducts);

// Obtener producto por ID
router.get('/:id', getProductById);

// Crear producto (solo admin)
router.post('/', protect, admin, createProduct);

// Actualizar producto (solo admin)
router.put('/:id', protect, admin, updateProduct);

// Eliminar producto (solo admin)
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;