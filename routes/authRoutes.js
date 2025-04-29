const express = require('express');
const { loginUser } = require('../controllers/userController');

const router = express.Router();

// Login de usuario
router.post('/login', loginUser);

module.exports = router;