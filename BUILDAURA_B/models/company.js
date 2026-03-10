import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    companySize: { type: String, required: true },
    industry: { type: String, required: true },
    companyId: { type: String, unique: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

// Auto-generate companyId CMP-0001
companySchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const lastCompany = await mongoose.model("Company").findOne().sort({ _id: -1 });

      let nextId = "CMP-0001";
      if (lastCompany && lastCompany.companyId) {
        const lastIdNumber = parseInt(lastCompany.companyId.split("-")[1]);
        nextId = `CMP-${String(lastIdNumber + 1).padStart(4, "0")}`;
      }

      this.companyId = nextId;
    } catch (error) {
      console.error("Error generating companyId:", error);
      return next(error);
    }
  }
  next();
});

// Prevent OverwriteModelError in dev environment
const Company = mongoose.models.Company || mongoose.model("Company", companySchema);

export default Company;
