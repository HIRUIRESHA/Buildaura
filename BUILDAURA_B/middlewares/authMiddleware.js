// middlewares/authMiddlewares.js
import User from "../models/user.js";
import Company from "../models/company.js";

// Protect client or engineer routes
export const protectUser = async (req, res, next) => {
  try {
    const clientId = req.headers["x-user-id"]; // pass clientId in headers
    if (!clientId) return res.status(401).json({ message: "Client ID required" });

    const user = await User.findById(clientId);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user; // attach user to request
    next();
  } catch (err) {
    console.error("User auth error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Protect company routes
export const protectCompany = async (req, res, next) => {
  try {
    const companyId = req.headers["x-company-id"]; // pass companyId in headers
    if (!companyId) return res.status(401).json({ message: "Company ID required" });

    const company = await Company.findById(companyId);
    if (!company) return res.status(401).json({ message: "Company not found" });

    req.company = company; // attach company to request
    next();
  } catch (err) {
    console.error("Company auth error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
