import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'orderModel'
  },
  orderModel: {
    type: String,
    required: true,
    enum: ['EcomOrder', 'FoodOrder']
  },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['card', 'upi', 'netbanking', 'wallet', 'cod'], required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  transactionId: { type: String },
  createdAt: { type: Date, default: Date.now }
});
export const Payment = mongoose.model('Payment', paymentSchema); 