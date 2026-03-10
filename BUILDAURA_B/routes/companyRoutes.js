import express from "express";
import bcrypt from "bcryptjs";
import Company from "../models/company.js";

const router = express.Router();

// Register company (auto approve + auto companyId)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phoneNumber, address, companySize, industry } = req.body;

    if (!name || !email || !password || !phoneNumber || !address || !companySize || !industry) {
      return res.status(400).json({ success: false, message: "All required fields must be provided" });
    }

    const existingCompany = await Company.findOne({ email });
    if (existingCompany) return res.status(400).json({ success: false, message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate next companyId
    const count = await Company.countDocuments() + 1;
    const companyId = `CMO-${String(count).padStart(4, "0")}`;

    const newCompany = new Company({
      companyId,
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      companySize,
      industry,
      status: "approved", // auto approve
    });

    await newCompany.save();

    res.status(201).json({
      success: true,
      message: "Company registered successfully",
      company: newCompany,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

//  Login company
router.post("/login", async (req, res) => {
  try {
    const { companyId, password } = req.body;

    const company = await Company.findOne({ companyId });
    if (!company) return res.status(404).json({ success: false, message: "Company not found" });

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Incorrect password" });

    res.json({
  success: true,
  message: `Login successful! Welcome ${company.name}`,
  company: {
    _id: company._id,  
    companyId: company.companyId,
    name: company.name,
    email: company.email,
    companySize: company.companySize,
    industry: company.industry,
  },
});
  } catch (error) {
    console.error("Company login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// Edit company (admin)
router.put("/edit/:id", async (req, res) => {
  try {
    const updatedData = req.body;
    const company = await Company.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!company) return res.status(404).json({ success: false, message: "Company not found" });

    res.json({ success: true, message: "Company updated successfully", company });
  } catch (error) {
    console.error("Edit error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Delete company (admin)
router.delete("/delete/:id", async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) return res.status(404).json({ success: false, message: "Company not found" });

    res.json({ success: true, message: "Company deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

//  Get all companies 
router.get("/all", async (req, res) => {
  try {
    const companies = await Company.find({ status: "approved" }).sort({ createdAt: -1 });
    res.json({ success: true, companies });
  } catch (error) {
    console.error("Get all companies error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get company by companyId
router.get("/get/:companyIdOrMongoId", async (req, res) => {
  try {
    const { companyIdOrMongoId } = req.params;

    let company;

    // Check if it’s a valid MongoDB ObjectId
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(companyIdOrMongoId);

    if (isValidObjectId) {
      company = await Company.findById(companyIdOrMongoId);
    } else {
      company = await Company.findOne({ companyId: companyIdOrMongoId });
    }

    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    res.json({ success: true, company });
  } catch (error) {
    console.error("Get company error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



export default router;
