import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import Company from "../models/company.js";


const router = express.Router();


//  Register user

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, role, company } = req.body;

    if (!firstName || !lastName || !email || !password || !phoneNumber || !role) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
      company: role === "engineer" ? company : null,
    });

    await newUser.save();

    // Send welcome message with generated userId
    res.status(201).json({
      message: `Registration successful! Welcome ${newUser.firstName}. Your User ID is ${newUser.userId}.`,
      userId: newUser.userId,
      firstName: newUser.firstName,
      role: newUser.role,
      company: newUser.company
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


//  Login using userId

router.post("/login", async (req, res) => {
  try {
    const { userId, password } = req.body;

    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    res.json({
      message: `Login successful! Welcome ${user.firstName}`,
      user: {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        company: user.company,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


//  Edit user (admin)

router.put("/edit/:id", async (req, res) => {
  try {
    const updatedData = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, message: "User updated successfully", user });
  } catch (error) {
    console.error("Edit error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


//  Delete user (admin)

router.delete("/delete/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

//  Get all users (admin dashboard)
router.get("/all", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

//  Get user by userId
router.get("/get/:userId", async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get all engineers for a specific company (by _id or companyId)
router.get("/company/:companyIdentifier", async (req, res) => {
  try {
    const { companyIdentifier } = req.params;
    let company;

    const isObjectId = /^[0-9a-fA-F]{24}$/.test(companyIdentifier);

    if (isObjectId) {
      company = await Company.findById(companyIdentifier);
    } else {
      company = await Company.findOne({ companyId: companyIdentifier.toUpperCase() });
    }

    if (!company) return res.status(404).json({ success: false, message: "Company not found" });

    //  Find engineers for this company
    const employees = await User.find({ company: company._id, role: "engineer" })
      .select("firstName lastName email phoneNumber role userId")
      .sort({ createdAt: -1 });

    res.json({ success: true, employees });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



export default router;
