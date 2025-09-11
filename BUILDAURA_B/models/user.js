import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  role: { type: String, enum: ["client", "engineer"], required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", default: null }, // updated
  userId: { type: String, unique: true, sparse: true } // auto-generated
}, { timestamps: true });

// Auto-generate userId before saving
userSchema.pre("save", async function(next) {
  if (this.isNew) {
    const User = mongoose.model("User", userSchema);
    let prefix = this.role === "client" ? "CLI" : "ENG";

    // Count existing users with the same role
    const count = await User.countDocuments({ role: this.role });
    const newIdNumber = count + 1;
    this.userId = `${prefix}-${newIdNumber.toString().padStart(4, "0")}`;
  }
  next();
});

export default mongoose.model("User", userSchema);
