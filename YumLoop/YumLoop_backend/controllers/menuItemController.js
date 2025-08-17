import { MenuItem } from '../Models/MenuItem.js';
import { jwtAuth, authorizeRoles } from '../middleware/auth.js';

// Create menu item (owner)
export const createMenuItem = async (req, res) => {
  // TODO: Add input validation and file upload logic
  try {
    const { name, description, price, image, restaurant, available } = req.body;
    const menuItem = await MenuItem.create({ name, description, price, image, restaurant, available });
    res.status(201).json(menuItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all menu items
export const getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get menu items by restaurant
export const getMenuItemsByRestaurant = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ restaurant: req.params.restaurantId });
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update menu item (owner)
export const updateMenuItem = async (req, res) => {
  // TODO: Add input validation and file upload logic
  try {
    const updates = req.body;
    const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(menuItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete menu item (owner)
export const deleteMenuItem = async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Menu item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Search menu items
export const searchMenuItems = async (req, res) => {
  try {
    const { q } = req.query;
    const menuItems = await MenuItem.find({ name: { $regex: q, $options: 'i' } });
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 