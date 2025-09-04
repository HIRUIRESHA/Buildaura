import express from "express";
import {
  submitProject,
  getClientProjects,
  getCompanyProjects,
  updateProjectStatus,
} from "../controllers/projectCartController.js";

const router = express.Router();

// ======================
// Submit a new project
// ======================
router.post("/submit", submitProject);

// ======================
// Get projects for a client
// clientId is the old userId (CLI-0001, etc.)
// ======================
router.get("/client/:clientId", getClientProjects);

// ======================
// Get projects for a company
// companyId is MongoDB _id of the company
// ======================
router.get("/company/:companyId", getCompanyProjects);

// ======================
// Update project status
// projectId is MongoDB _id of the project
// ======================
router.put("/status/:projectId", updateProjectStatus);

export default router;
