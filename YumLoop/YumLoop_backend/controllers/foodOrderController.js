import { FoodOrder } from '../Models/FoodOrder.js';
import { jwtAuth } from '../middleware/auth.js';
import { getIO } from '../socket/socket.js';

// Place order
export const placeOrder = async (req, res) => {
  // TODO: Add input validation
  try {
    const { restaurant, items, totalAmount, deliveryAddress } = req.body;
    const order = await FoodOrder.create({
      user: req.user.id,
      restaurant,
      items,
      totalAmount,
      deliveryAddress
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get order by ID
export const getOrder = async (req, res) => {
  try {
    const order = await FoodOrder.findById(req.params.id)
      .populate("user", "name")
      .populate("restaurant", "name")
      .populate("items.menuItem");
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get orders by user
export const getOrders = async (req, res) => {
  try {
    const orders = await FoodOrder.find({ user: req.user.id })
      .populate("restaurant", "name")
      .sort({ orderedAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get orders by restaurant
export const getOrdersByRestaurant = async (req, res) => {
  try {
    const orders = await FoodOrder.find({ restaurant: req.params.restaurantId })
      .populate("user", "name")
      .sort({ orderedAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await FoodOrder.findByIdAndUpdate(req.params.id, { status }, { new: true });
    // Emit real-time event to user
    const io = getIO();
    if (io && order) {
      io.to(order.user.toString()).emit('orderStatusUpdate', { orderId: order._id, status: order.status });
    }
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Cancel order
export const cancelOrder = async (req, res) => {
  try {
    const order = await FoodOrder.findByIdAndUpdate(req.params.id, { status: "cancelled" }, { new: true });
    // Emit real-time event to user
    const io = getIO();
    if (io && order) {
      io.to(order.user.toString()).emit('orderStatusUpdate', { orderId: order._id, status: order.status });
    }
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Track order
export const trackOrder = async (req, res) => {
  // Real-time tracking handled by Socket.IO events
  res.status(200).json({ message: "Track order via real-time events." });
}; 