import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  menu: [{ type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "FoodReview" }],
  image: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const Restaurant = mongoose.model("Restaurant", restaurantSchema); 