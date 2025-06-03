import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  assetName: String,
  tokenName: String,
  tokenValue: String,
  tokenSymbol: String,
  tokenSupply: Number,
  decimal: Number,
  auditorName: String,
  adminCommission: Number,
  assetValue: Number,
  category: String,
  assetType: String,
  tokenType: String,
  offerStartDate: Date,
  offerEndDate: Date,
  rewardDate: Date,
  reward: String,
  description: String,
  documentUrl: String,
  reportUrl: String,
  tokenImageUrl: String,
  assetImageUrl: String,
  status: { type: String, default: "active" },
}, { timestamps: true });

export default mongoose.model("Token", tokenSchema);
