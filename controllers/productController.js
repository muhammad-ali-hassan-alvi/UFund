import Product from "../models/productModel.js";


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

    const documentUrl = req.files?.document?.[0]?.path || null;
    const reportUrl = req.files?.report?.[0]?.path || null;
    const productImageUrl = req.files?.productImage?.[0]?.path || null;


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
      documentUrl, // Use direct URL
      reportUrl, // Use direct URL
      productImageUrl,
    });

    await newProduct.save();
    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    console.error("Error in createProduct:", error);
    res.status(500).json({ success: false, error: "Failed to create product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const updates = { ...req.body };

    if (req.files?.document?.[0]) {
      updates.documentUrl = req.files.document[0].path; // Use direct URL
    }
    if (req.files?.report?.[0]) {
      updates.reportUrl = req.files.report[0].path; // Use direct URL
    }
    if (req.files?.productImage?.[0]) {
      updates.productImageUrl = req.files.productImage[0].path;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    res.status(200).json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error("Error in updateProduct:", error);
    res.status(500).json({ success: false, error: "Failed to update product" });
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

    res.status(200).json({ message: "Product soft deleted", product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
