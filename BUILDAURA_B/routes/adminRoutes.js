import express from "express";

const router = express.Router();

// @route   POST /api/admin/login
// @desc    Admin login using .env credentials
// @access  Public
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check against .env values
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.json({
      message: "Admin login successful",
      role: "admin",
    });
  }

  // Invalid credentials
  return res.status(401).json({ message: "Invalid admin credentials" });
});

export default router;
