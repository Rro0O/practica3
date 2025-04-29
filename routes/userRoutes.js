const express = require('express');
const {
  createUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const { protect, admin } = require('../middlewares/auth');

const router = express.Router();

// Crear usuario
router.post('/', createUser);

// Login usuario
router.post('/login', loginUser);

// Obtener todos los usuarios (sólo admin)
router.get('/', protect, admin, getUsers);

// Obtener usuario por ID (admin o dueño)
router.get('/:id', protect, getUserById);

// Actualizar usuario
router.put('/:id', protect, updateUser);

// Eliminar usuario (solo admin)
router.delete('/:id', protect, admin, deleteUser);

module.exports = router;