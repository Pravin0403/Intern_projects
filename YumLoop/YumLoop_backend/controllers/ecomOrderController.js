import { EcomOrder } from '../Models/EcomOrder.js';

export const placeOrder = async (req, res) => {
  try {
    const { items, totalAmount, address } = req.body;
    const order = await EcomOrder.create({
      user: req.user.id,
      items,
      totalAmount,
      address
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await EcomOrder.findById(req.params.id)
      .populate('user', 'name')
      .populate('items.product')
      .populate('address');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await EcomOrder.find({ user: req.user.id })
      .populate('items.product')
      .sort({ orderedAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await EcomOrder.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const order = await EcomOrder.findByIdAndUpdate(req.params.id, { status: 'cancelled' }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}; 