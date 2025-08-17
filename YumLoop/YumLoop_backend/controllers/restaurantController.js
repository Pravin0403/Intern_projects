import { Restaurant } from '../Models/Restaurant.js';
import { jwtAuth, authorizeRoles } from '../middleware/auth.js';

// Create restaurant (owner)
export const createRestaurant = async (req, res) => {
  // TODO: Add input validation and file upload logic
  try {
    const { name, address, image } = req.body;
    const restaurant = await Restaurant.create({ name, address, image, owner: req.user.id });
    res.status(201).json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all restaurants
export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get restaurant by ID
export const getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update restaurant (owner)
export const updateRestaurant = async (req, res) => {
  // TODO: Add input validation and file upload logic
  try {
    const updates = req.body;
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete restaurant (owner)
export const deleteRestaurant = async (req, res) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.json({ message: 'Restaurant deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Search restaurants
export const searchRestaurants = async (req, res) => {
  try {
    const { q } = req.query;
    const restaurants = await Restaurant.find({ name: { $regex: q, $options: 'i' } });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get restaurants by owner
export const getRestaurantsByOwner = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ owner: req.user.id });
    res.json(restaurants);
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

// Admin approve restaurant
export const approveRestaurant = async (req, res) => {
  try {
    // Implement admin approval logic
    res.json({ message: 'Restaurant approved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 