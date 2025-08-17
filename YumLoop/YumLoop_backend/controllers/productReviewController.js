import { ProductReview } from '../Models/ProductReview.js';
import { getIO } from '../socket/socket.js';
import { Product } from '../Models/Product.js';

export const addReview = async (req, res) => {
  try {
    const { product, rating, comment, images } = req.body;
    const review = await ProductReview.create({
      user: req.user.id,
      product,
      rating,
      comment,
      images
    });
    // Emit real-time event to product owner
    const io = getIO();
    if (io) {
      const prod = await Product.findById(product);
      if (prod) {
        io.to(prod.owner?.toString?.() || '').emit('productReviewed', { productId: product, userId: req.user.id, rating, comment });
      }
    }
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await ProductReview.find({ product: req.params.id }).populate('user', 'name avatar');
    res.json(reviews);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getReviewsByUser = async (req, res) => {
  try {
    const reviews = await ProductReview.find({ user: req.params.id });
    res.json(reviews);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const editReview = async (req, res) => {
  try {
    const updates = req.body;
    const review = await ProductReview.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    await ProductReview.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}; 