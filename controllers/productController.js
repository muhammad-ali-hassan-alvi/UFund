import Product from "../models/productModel.js";
import cloudinary from "../config/cloudinary.js";

// Upload helper
const uploadToCloudinary = async (file, folder) => {
  return await cloudinary.uploader.upload(file.path, { folder });
};

export const createProduct = async (req, res) => {
  try {
    const {
      productName,
      brand,
      numberOfProducts,
      hsCode,
      eanCode,
      upcCode,
      category,
      currency,
      investmentProfit,
      adminCommission,
      unitPrice,
      totalValue,
      campaigner,
      description,
      offerStartDate,
      offerEndDate,
      investmentStartDate,
      maturityDays,
      maturityDate,
    } = req.body;

    const document = req.files?.document?.[0];
    const report = req.files?.report?.[0];
    const productImage = req.files?.productImage?.[0];

    const [documentRes, reportRes, imageRes] = await Promise.all([
      document ? uploadToCloudinary(document, "documents") : null,
      report ? uploadToCloudinary(report, "reports") : null,
      productImage ? uploadToCloudinary(productImage, "productImages") : null,
    ]);

    const newProduct = new Product({
      productName,
      brand,
      numberOfProducts,
      hsCode,
      eanCode,
      upcCode,
      category,
      currency,
      investmentProfit,
      adminCommission,
      unitPrice,
      totalValue,
      campaigner,
      description,
      offerStartDate,
      offerEndDate,
      investmentStartDate,
      maturityDays,
      maturityDate,
      documentUrl: documentRes?.secure_url || null,
      reportUrl: reportRes?.secure_url || null,
      productImageUrl: imageRes?.secure_url || null,
    });

    await newProduct.save();
    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to create product" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: "active" }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch products" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    const updates = req.body;
    const document = req.files?.document?.[0];
    const report = req.files?.report?.[0];
    const productImage = req.files?.productImage?.[0];

    if (document) {
      const docRes = await uploadToCloudinary(document, "documents");
      updates.documentUrl = docRes.secure_url;
    }

    if (report) {
      const repRes = await uploadToCloudinary(report, "reports");
      updates.reportUrl = repRes.secure_url;
    }

    if (productImage) {
      const imgRes = await uploadToCloudinary(productImage, "productImages");
      updates.productImageUrl = imgRes.secure_url;
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    res.status(200).json({ success: true, product: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to update product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(
      id,
      { status: "deleted" },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted", product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
