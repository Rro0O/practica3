const Product = require('../models/Product');

// Obtener todos los productos
const getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
};

// Crear nuevo producto (solo admin)
const createProduct = async (req, res) => {
    const { name, description, price, stock, category } = req.body;

    try {
        const product = await Product.create({ name, description, price, stock, category });

        res.status(201).json({
            _id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            category: product.category
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar producto
const updateProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = req.body.name || product.name;
        product.description = req.body.description || product.description;
        product.price = req.body.price || product.price;
        product.stock = req.body.stock || product.stock;
        product.category = req.body.category || product.category;

        const updatedProduct = await product.save();

        res.json({
            _id: updatedProduct._id,
            name: updatedProduct.name,
            description: updatedProduct.description,
            price: updatedProduct.price,
            stock: updatedProduct.stock,
            category: updatedProduct.category
        });
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
};

// Eliminar producto
const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.remove();
        res.json({ message: 'Producto eliminado' });
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};