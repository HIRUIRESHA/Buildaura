import mongoose from "mongoose";

const projectCartSchema = new mongoose.Schema(
  {
    projectName: { type: String, required: true },
    client: { type: String, required: true }, // store userId like "CLI-0001"
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    startDate: { type: Date, required: true },
    budget: { type: Number, required: true },
    description: { type: String, required: true },
    projectType: {
      type: String,
      enum: ["residential", "commercial", "industrial", "infrastructure", "renovation"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "in progress", "completed", "hold"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("ProjectCart", projectCartSchema);
