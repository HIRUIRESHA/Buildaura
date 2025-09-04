import mongoose from "mongoose";

const companyCartSchema = new mongoose.Schema(
  {
    companyId: {
      type: String,
      required: true,
      immutable: true,
      unique: true,
    },
    companyName: {
      type: String,
      required: true,
      immutable: true,
    },
    experience: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    rating: {
      type: Number,
      default: 5,
      min: 0,
      max: 5,
    },
    projects: {
      type: Number,
      default: 0,
    },
    features: {
      type: [String],
      default: [],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const CompanyCart = mongoose.model("CompanyCart", companyCartSchema);

export default CompanyCart;
