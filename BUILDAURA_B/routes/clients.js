import express from "express";
import User from "../models/user.js";

const router = express.Router();

// Get all users with role "client"
router.get("/all", async (req, res) => {
  try {
    const clients = await User.find({ role: "client" }).sort({ firstName: 1 });

    res.json({ success: true, clients });
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
