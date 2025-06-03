import Token from "../models/tokenModel.js";
import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = async (file, folder) => {
  return await cloudinary.uploader.upload(file.path, { folder });
};

// CREATE TOKEN
export const createToken = async (req, res) => {
  try {
    const {
      assetName,
      tokenName,
      tokenValue,
      tokenSymbol,
      tokenSupply,
      decimal,
      auditorName,
      adminCommission,
      assetValue,
      category,
      assetType,
      tokenType,
      offerStartDate,
      offerEndDate,
      rewardDate,
      reward,
      description,
    } = req.body;

    const document = req.files?.document?.[0];
    const report = req.files?.report?.[0];
    const tokenImage = req.files?.tokenImage?.[0];
    const assetImage = req.files?.assetImage?.[0];

    const [docRes, reportRes, tokenImgRes, assetImgRes] = await Promise.all([
      document ? uploadToCloudinary(document, "token-documents") : null,
      report ? uploadToCloudinary(report, "token-reports") : null,
      tokenImage ? uploadToCloudinary(tokenImage, "token-images") : null,
      assetImage ? uploadToCloudinary(assetImage, "asset-images") : null,
    ]);

    const newToken = new Token({
      assetName,
      tokenName,
      tokenValue,
      tokenSymbol,
      tokenSupply,
      decimal,
      auditorName,
      adminCommission,
      assetValue,
      category,
      assetType,
      tokenType,
      offerStartDate,
      offerEndDate,
      rewardDate,
      reward,
      description,
      documentUrl: docRes?.secure_url || null,
      reportUrl: reportRes?.secure_url || null,
      tokenImageUrl: tokenImgRes?.secure_url || null,
      assetImageUrl: assetImgRes?.secure_url || null,
    });

    await newToken.save();
    res.status(201).json({ success: true, token: newToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to create token" });
  }
};

// GET ALL TOKENS
export const getAllTokens = async (req, res) => {
  try {
    const tokens = await Token.find({ status: "active" }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, tokens });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch tokens" });
  }
};

// GET TOKEN BY ID
export const getTokenById = async (req, res) => {
  try {
    const token = await Token.findById(req.params.id);
    if (!token) return res.status(404).json({ success: false, message: "Token not found" });

    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch token" });
  }
};

// UPDATE TOKEN
export const updateToken = async (req, res) => {
  try {
    const token = await Token.findById(req.params.id);
    if (!token) return res.status(404).json({ success: false, message: "Token not found" });

    const updates = req.body;

    const document = req.files?.document?.[0];
    const report = req.files?.report?.[0];
    const tokenImage = req.files?.tokenImage?.[0];
    const assetImage = req.files?.assetImage?.[0];

    if (document) {
      const docRes = await uploadToCloudinary(document, "token-documents");
      updates.documentUrl = docRes.secure_url;
    }

    if (report) {
      const reportRes = await uploadToCloudinary(report, "token-reports");
      updates.reportUrl = reportRes.secure_url;
    }

    if (tokenImage) {
      const tokenImgRes = await uploadToCloudinary(tokenImage, "token-images");
      updates.tokenImageUrl = tokenImgRes.secure_url;
    }

    if (assetImage) {
      const assetImgRes = await uploadToCloudinary(assetImage, "asset-images");
      updates.assetImageUrl = assetImgRes.secure_url;
    }

    const updatedToken = await Token.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.status(200).json({ success: true, token: updatedToken });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to update token" });
  }
};

// DELETE TOKEN
export const deleteToken = async (req, res) => {
  try {
    const token = await Token.findByIdAndUpdate(
      req.params.id,
      { status: "deleted" },
      { new: true }
    );

    if (!token) return res.status(404).json({ message: "Token not found" });

    res.status(200).json({ message: "Token deleted", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
