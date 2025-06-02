import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: String,
    brand: String,
    numberOfProducts: Number,
    hsCode: String,
    eanCode: String,
    upcCode: String,
    category: String,
    currency: String,
    investmentProfit: Number,
    adminCommission: Number,
    unitPrice: Number,
    totalValue: Number,
    campaigner: String,
    description: String,
    offerStartDate: Date,
    offerEndDate: Date,
    investmentStartDate: Date,
    maturityDays: Number,
    maturityDate: Date,
    documentUrl: String,
    reportUrl: String,
    productImageUrl: String,

    // New field for soft delete
    status: {
      type: String,
      enum: ["active", "deleted"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
