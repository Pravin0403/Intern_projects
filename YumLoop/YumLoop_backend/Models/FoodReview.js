import mongoose from "mongoose";
const foodReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodOrder' },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, default: '' },
  images: [{ public_id: String, url: String }],
  createdAt: { type: Date, default: Date.now }
});
export const FoodReview = mongoose.model('FoodReview', foodReviewSchema); 