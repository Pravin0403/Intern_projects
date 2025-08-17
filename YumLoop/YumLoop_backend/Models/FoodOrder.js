import mongoose from "mongoose";
const foodOrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  items: [{ menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }, quantity: Number }],
  totalAmount: { type: Number, required: true },
  deliveryAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
  status: { type: String, enum: ['placed', 'preparing', 'on the way', 'delivered', 'cancelled'], default: 'placed' },
  deliveryPartner: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryPartner' },
  orderedAt: { type: Date, default: Date.now },
  deliveredAt: { type: Date }
});
export const FoodOrder = mongoose.model('FoodOrder', foodOrderSchema); 