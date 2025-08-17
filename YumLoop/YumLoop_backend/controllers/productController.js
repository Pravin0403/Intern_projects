import { Product } from '../Models/Product.js';
import { jwtAuth, authorizeRoles } from '../middleware/auth.js';

// Create product (admin)
export const createProduct = async (req, res) => {
  // TODO: Add input validation and file upload logic
  try {
    const { name, description, price, images, category, stock } = req.body;
    const product = await Product.create({ name, description, price, images, category, stock });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get product by ID
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update product (admin)
export const updateProduct = async (req, res) => {
  // TODO: Add input validation and file upload logic
  try {
    const updates = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete product (admin)
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Search products
export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    const products = await Product.find({ name: { $regex: q, $options: 'i' } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add review
export const addReview = async (req, res) => {
  // TODO: Add input validation
  try {
    // Implement review logic
    res.json({ message: 'Review added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get reviews
export const getReviews = async (req, res) => {
  try {
    // Implement get reviews logic
    res.json([]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin approve product
export const approveProduct = async (req, res) => {
  try {
    // Implement admin approval logic
    res.json({ message: 'Product approved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 