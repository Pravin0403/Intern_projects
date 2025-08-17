import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  media: { public_id: String, url: String },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true }
});

export const Story = mongoose.model("Story", storySchema); 