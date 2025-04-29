const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Función para generar token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: '30d' });
};

// Crear nuevo usuario
const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const user = await User.create({ name, email, password, role });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Login de usuario
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && await user.matchPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });
    } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
    }
};

// Obtener todos los usuarios
const getUsers = async (req, res) => {
    const users = await User.find().select('-password'); // No mostrar password
    res.json(users);
};

// Obtener usuario por ID
const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id).select('-password'); // No mostrar password

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
};

// Actualizar usuario
const updateUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role
        });
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
};

// Eliminar usuario
const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.remove();
        res.json({ message: 'Usuario eliminado' });
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
};

module.exports = {
    createUser,
    loginUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};