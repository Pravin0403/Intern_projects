import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  images: [{ public_id: String, url: String }],
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  stock: { type: Number, default: 0 },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductReview" }],
  createdAt: { type: Date, default: Date.now }
});

export const Product = mongoose.model("Product", productSchema); 