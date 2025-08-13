import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: { type: String }, // will be auto-assigned after admin approval
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    role: { type: String, enum: ["client", "site-engineer"], required: true },
    company: { type: String },
    status: { type: String, enum: ["pending", "approved"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
