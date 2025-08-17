import mongoose from "mongoose";

const deliveryPartnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  vehicleNumber: { type: String },
  isAvailable: { type: Boolean, default: true },
  assignedOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: "FoodOrder" }]
});

export const DeliveryPartner = mongoose.model("DeliveryPartner", deliveryPartnerSchema); 