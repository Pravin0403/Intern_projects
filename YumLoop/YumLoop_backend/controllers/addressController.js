import { Address } from '../Models/Address.js';
import { jwtAuth } from '../middleware/auth.js';

// Add address
export const addAddress = async (req, res) => {
  // TODO: Add input validation
  try {
    const { line1, line2, city, state, pincode, country, phone } = req.body;
    const address = await Address.create({ user: req.user.id, line1, line2, city, state, pincode, country, phone });
    res.status(201).json(address);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get addresses by user
export const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user.id });
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update address
export const updateAddress = async (req, res) => {
  // TODO: Add input validation
  try {
    const updates = req.body;
    const address = await Address.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(address);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove address
export const removeAddress = async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);
    res.json({ message: 'Address removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 