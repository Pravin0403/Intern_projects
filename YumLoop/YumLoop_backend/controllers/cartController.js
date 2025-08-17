import { Cart } from '../Models/Cart.js';
import { jwtAuth } from '../middleware/auth.js';
import { getIO } from '../socket/socket.js';

// Add to cart
export const addToCart = async (req, res) => {
  // TODO: Add input validation
  try {
    const { product, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) cart = await Cart.create({ user: req.user.id, items: [] });
    const idx = cart.items.findIndex(i => i.product.toString() === product);
    if (idx > -1) {
      cart.items[idx].quantity += quantity;
    } else {
      cart.items.push({ product, quantity });
    }
    await cart.save();
    // Emit real-time event to user
    const io = getIO();
    if (io) {
      io.to(req.user.id.toString()).emit('cartUpdated', { userId: req.user.id, items: cart.items });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove from cart
export const removeFromCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    cart.items = cart.items.filter(i => i.product.toString() !== req.body.product);
    await cart.save();
    // Emit real-time event to user
    const io = getIO();
    if (io) {
      io.to(req.user.id.toString()).emit('cartUpdated', { userId: req.user.id, items: cart.items });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update cart
export const updateCart = async (req, res) => {
  // TODO: Add input validation
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    const { product, quantity } = req.body;
    const idx = cart.items.findIndex(i => i.product.toString() === product);
    if (idx > -1) {
      cart.items[idx].quantity = quantity;
      await cart.save();
      // Emit real-time event to user
      const io = getIO();
      if (io) {
        io.to(req.user.id.toString()).emit('cartUpdated', { userId: req.user.id, items: cart.items });
      }
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Product not in cart' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    cart.items = [];
    await cart.save();
    // Emit real-time event to user
    const io = getIO();
    if (io) {
      io.to(req.user.id.toString()).emit('cartUpdated', { userId: req.user.id, items: cart.items });
    }
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 