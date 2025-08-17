import { FoodReview } from '../Models/FoodReview.js';
import { jwtAuth } from '../middleware/auth.js';
import { getIO } from '../socket/socket.js';
import { Restaurant } from '../Models/Restaurant.js';

// Add review
export const addReview = async (req, res) => {
  // TODO: Add input validation and file upload logic
  try {
    const { restaurant, order, rating, comment, images } = req.body;
    const review = await FoodReview.create({
      user: req.user.id,
      restaurant,
      order,
      rating,
      comment,
      images
    });
    // Emit real-time event to restaurant owner
    const io = getIO();
    if (io) {
      const rest = await Restaurant.findById(restaurant);
      if (rest && rest.owner) {
        io.to(rest.owner.toString()).emit('foodReviewed', { restaurantId: restaurant, userId: req.user.id, rating, comment });
      }
    }
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get reviews by restaurant
export const getReviews = async (req, res) => {
  try {
    const reviews = await FoodReview.find({ restaurant: req.params.id }).populate("user", "name avatar");
    res.json(reviews);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get reviews by user
export const getReviewsByUser = async (req, res) => {
  try {
    const reviews = await FoodReview.find({ user: req.params.id });
    res.json(reviews);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Edit review
export const editReview = async (req, res) => {
  // TODO: Add input validation
  try {
    const updates = req.body;
    const review = await FoodReview.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete review
export const deleteReview = async (req, res) => {
  try {
    await FoodReview.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}; 