import Profile from "../models/profileModel.js";
import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = async (file, folder) => {
  return await cloudinary.uploader.upload(file.path, { folder });
};

export const createProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      countryCode,
      phoneNumber,
      email,
      investorType,
      invoiceCycle,
      totalAnnualRevenue,
      addressLine1,
      addressLine2,
      city,
      zipCode,
      state,
      country,
      companyName,
      companyEmail,
      companyPhone,
      companyAddress,
      bankName,
      accountName,
      accountNumber,
      routingNumber,
      ibanNumber,
      swiftCode,
      accountType,
      bankAddress,
    } = req.body;

    const profileImage = req.file;

    const imageRes = profileImage
      ? await uploadToCloudinary(profileImage, "profileImages")
      : null;

    const newProfile = new Profile({
      profileImageUrl: imageRes?.secure_url || null,
      firstName,
      lastName,
      countryCode,
      phoneNumber,
      email,
      investorType,
      invoiceCycle,
      totalAnnualRevenue,
      addressLine1,
      addressLine2,
      city,
      zipCode,
      state,
      country,
      companyName,
      companyEmail,
      companyPhone,
      companyAddress,
      bankName,
      accountName,
      accountNumber,
      routingNumber,
      ibanNumber,
      swiftCode,
      accountType,
      bankAddress,
    });

    await newProfile.save();
    res.status(201).json({ success: true, profile: newProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to create profile" });
  }
};

export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({ status: "active" }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, profiles });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch profiles" });
  }
};

export const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }
    res.status(200).json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    const updates = req.body;
    const profileImage = req.file;

    if (profileImage) {
      const imgRes = await uploadToCloudinary(profileImage, "profileImages");
      updates.profileImageUrl = imgRes.secure_url;
    }

    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    res.status(200).json({ success: true, profile: updatedProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to update profile" });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findByIdAndUpdate(
      id,
      { status: "deleted" },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ message: "Profile deleted", profile });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
