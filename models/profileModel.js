import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  profileImageUrl: String,

  firstName: String,
  lastName: String,
  countryCode: String,
  phoneNumber: String,
  email: String,

  investorType: String,
  invoiceCycle: String,
  totalAnnualRevenue: Number,

  addressLine1: String,
  addressLine2: String,
  city: String,
  zipCode: String,
  state: String,
  country: String,

  companyName: String,
  companyEmail: String,
  companyPhone: String,
  companyAddress: String,

  bankName: String,
  accountName: String,
  accountNumber: String,
  routingNumber: String,
  ibanNumber: String,
  swiftCode: String,
  accountType: String,
  bankAddress: String,

  status: {
    type: String,
    default: "active", // can be 'active' or 'deleted'
  },
}, { timestamps: true });

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;

