import mongoose from "mongoose";

const reelSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  video: { public_id: String, url: String },
  caption: { type: String },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now }
});

export const Reel = mongoose.model("Reel", reelSchema); 