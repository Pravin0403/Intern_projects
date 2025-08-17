import { Wishlist } from '../Models/Wishlist.js';
import { jwtAuth } from '../middleware/auth.js';
import { getIO } from '../socket/socket.js';

// Add to wishlist
export const addToWishlist = async (req, res) => {
  // TODO: Add input validation
  try {
    const { product } = req.body;
    let wishlist = await Wishlist.findOne({ user: req.user.id });
    if (!wishlist) wishlist = await Wishlist.create({ user: req.user.id, products: [] });
    if (!wishlist.products.includes(product)) wishlist.products.push(product);
    await wishlist.save();
    // Emit real-time event to user
    const io = getIO();
    if (io) {
      io.to(req.user.id.toString()).emit('wishlistUpdated', { userId: req.user.id, products: wishlist.products });
    }
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id });
    if (!wishlist) return res.status(404).json({ error: 'Wishlist not found' });
    wishlist.products = wishlist.products.filter(p => p.toString() !== req.body.product);
    await wishlist.save();
    // Emit real-time event to user
    const io = getIO();
    if (io) {
      io.to(req.user.id.toString()).emit('wishlistUpdated', { userId: req.user.id, products: wishlist.products });
    }
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get wishlist
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id }).populate('products');
    res.json(wishlist || { products: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Clear wishlist
export const clearWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id });
    if (!wishlist) return res.status(404).json({ error: 'Wishlist not found' });
    wishlist.products = [];
    await wishlist.save();
    res.json({ message: 'Wishlist cleared' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 