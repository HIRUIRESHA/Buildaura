// import User from "../models/user.js";
// import Company from "../models/company.js";

// // Protect routes for clients/engineers
// export const protectUser = async (req, res, next) => {
//   try {
//     // Expect user ID in headers 
//     const clientId = req.headers["x-user-id"];
//     if (!clientId) {
//       return res.status(401).json({ message: "User ID is required in headers" });
//     }

//     // Find user by ID
//     const user = await User.findById(clientId);
//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     // Optional: Check for user roles (client, engineer)
//     if (!["client", "engineer"].includes(user.role)) {
//       return res.status(403).json({ message: "Unauthorized role" });
//     }

//     // Attach user object to request
//     req.user = user;
//     next();
//   } catch (err) {
//     console.error("User auth error:", err.message);
//     res.status(500).json({ message: "Server error during user authentication" });
//   }
// };

// // Protect routes for companies
// export const protectCompany = async (req, res, next) => {
//   try {
//     // Expect company ID in headers (x-company-id)
//     const companyId = req.headers["x-company-id"];
//     if (!companyId) {
//       return res.status(401).json({ message: "Company ID is required in headers" });
//     }

//     // Find company by ID
//     const company = await Company.findById(companyId);
//     if (!company) {
//       return res.status(401).json({ message: "Company not found" });
//     }

//     // // Check for company status (active)
//     // if (company.status && company.status !== "active") {
//     //   return res.status(403).json({ message: "Company not active" });
//     // }

//     // Attach company object to request
//     req.company = company;
//     next();
//   } catch (err) {
//     console.error("Company auth error:", err.message);
//     res.status(500).json({ message: "Server error during company authentication" });
//   }
// };