import mongoose from "mongoose";
const productReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, default: '' },
  images: [{ public_id: String, url: String }],
  createdAt: { type: Date, default: Date.now }
});
export const ProductReview = mongoose.model('ProductReview', productReviewSchema); 