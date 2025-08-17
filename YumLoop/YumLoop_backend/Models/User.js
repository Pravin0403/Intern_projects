import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, unique: true, sparse: true },
  fullName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  bio: { type: String, default: "" },
  website: { type: String },
  isVerified: { type: Boolean, default: false },
  googleId: { type: String, sparse: true },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model("User", userSchema); 