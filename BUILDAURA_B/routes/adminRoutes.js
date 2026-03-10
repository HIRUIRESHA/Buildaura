import express from "express";

const router = express.Router();


router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check .env values
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
