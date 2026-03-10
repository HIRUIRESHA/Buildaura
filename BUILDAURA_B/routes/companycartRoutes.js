import express from "express";
import multer from "multer";
import {
  createCompanyCart,
  getCompanyCarts,
  getCompanyCartById,
  updateCompanyCart,
  deleteCompanyCart,
  getCompanyCartByCompanyId, // new controller
} from "../controllers/companyCartControllers.js";

const router = express.Router();

// Multer 
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});



//  Get cart by companyId 
router.get("/company/:companyId", getCompanyCartByCompanyId);

// Get cart by MongoDB _id
router.get("/:id", getCompanyCartById);

// Get all carts
router.get("/", getCompanyCarts);

// Create new cart
router.post("/", upload.single("image"), createCompanyCart);

// Update cart by _id
router.put("/:id", upload.single("image"), updateCompanyCart);

// Delete cart by _id
router.delete("/:id", deleteCompanyCart);

export default router;
