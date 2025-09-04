import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

const router = express.Router();

// =========================
// 1️⃣ Register user
// =========================
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

// =========================
// 2️⃣ Login using userId
// =========================
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

// =========================
// 3️⃣ Removed approve/reject routes
// =========================

// =========================
// 4️⃣ Edit user (admin)
// =========================
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

// =========================
// 5️⃣ Delete user (admin)
// =========================
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

// =========================
// 6️⃣ Get all users (admin dashboard)
// =========================
router.get("/all", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// =========================
// 7️⃣ Get user by userId
// =========================
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

export default router;
