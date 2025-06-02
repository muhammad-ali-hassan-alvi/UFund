import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    subject: String,
    emailAddress: String,
    description: String,
    status: {
        type: String,
        enum: ["active", "deleted"],
        default: "active"
    }
},
  { timestamps: true })

const Contact = mongoose.model("Contact", contactSchema)
export default Contact