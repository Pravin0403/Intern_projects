import mongoose from "mongoose";
const ecomOrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }],
  totalAmount: { type: Number, required: true },
  address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
  status: { type: String, enum: ['placed', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'placed' },
  orderedAt: { type: Date, default: Date.now },
  deliveredAt: { type: Date }
});
export const EcomOrder = mongoose.model('EcomOrder', ecomOrderSchema); 