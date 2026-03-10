import express from "express";
import mongoose from "mongoose";
import ProjectCart from "../models/projectcart.js";
import User from "../models/user.js";
import Company from "../models/company.js";

const router = express.Router();

// POST /api/projectcart/submit
router.post("/submit", async (req, res) => {
  try {
    const {
      projectName,
      clientId,
      companyId,
      startDate,
      budget,
      description,
      projectType,
      status = "pending"
    } = req.body;

    if (!projectName || !clientId || !companyId || !startDate || !budget || !description || !projectType) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    let client;
    if (mongoose.Types.ObjectId.isValid(clientId)) {
      client = await User.findById(clientId);
    } else {
      client = await User.findOne({ userId: clientId });
    }
    if (!client || client.role !== "client") {
      return res.status(400).json({ success: false, message: "Invalid client" });
    }

    const company = await Company.findById(companyId);
    if (!company) return res.status(400).json({ success: false, message: "Invalid company" });

    const startDateObj = new Date(startDate);
    if (isNaN(budget) || budget <= 0) return res.status(400).json({ success: false, message: "Invalid budget" });
    if (startDateObj <= new Date()) return res.status(400).json({ success: false, message: "Start date must be in the future" });

    const newProject = new ProjectCart({
      projectName,
      client: client._id,
      company: company._id,
      startDate: startDateObj,
      budget: parseFloat(budget),
      description,
      projectType,
      status,
      statusHistory: [{ status, changedAt: new Date(), changedBy: client._id, notes: "Project created" }]
    });

    await newProject.save();

    const populatedProject = await ProjectCart.findById(newProject._id)
      .populate("client", "firstName lastName email userId")
      .populate("company", "name email");

    res.status(201).json({ success: true, message: "Project submitted", project: populatedProject });
  } catch (error) {
    console.error("Submit project error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

      
      router.get("/all", async (req, res) => {
        try {
          const { status, clientId, companyId } = req.query;

          const filter = {};
          if (status && status !== "all") filter.status = status;
          if (clientId && mongoose.Types.ObjectId.isValid(clientId)) filter.client = clientId;
          if (companyId && mongoose.Types.ObjectId.isValid(companyId)) filter.company = companyId;

          const projects = await ProjectCart.find(filter)
            .populate("client", "firstName lastName userId")
            .populate("company", "name email")
            .sort({ createdAt: -1 });

          res.json({ success: true, count: projects.length, projects });
        } catch (error) {
          console.error("Get all projects error:", error);
          res.status(500).json({ success: false, message: "Error fetching all projects", error: error.message });
        }
      });

// GET client/:clientId
router.get("/client/:clientId", async (req, res) => {
  try {
    const { clientId } = req.params;
    const { status } = req.query;

    let filter;
    if (mongoose.Types.ObjectId.isValid(clientId)) {
      filter = { client: clientId };
    } else {
      const user = await User.findOne({ userId: clientId });
      if (!user) return res.status(404).json({ success: false, message: "Client not found" });
      filter = { client: user._id };
    }

    if (status && status !== "all") filter.status = status;

    const projects = await ProjectCart.find(filter)
      .populate("client", "firstName lastName email userId")
      .populate("company", "name email")
      .sort({ createdAt: -1 });

    res.json({ success: true, count: projects.length, projects });
  } catch (error) {
    console.error("Get client projects error:", error);
    res.status(500).json({ success: false, message: "Error fetching client projects", error: error.message });
  }
});

// GET company/:companyId

router.get("/company/:companyId", async (req, res) => {
  try {
    const { companyId } = req.params;
    const { status } = req.query;

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({ success: false, message: "Invalid company ID" });
    }

    const filter = { company: companyId };
    if (status && status !== "all") filter.status = status;

    const projects = await ProjectCart.find(filter)
      .populate("client", "firstName lastName email userId")
      .populate("company", "name email")
      .sort({ createdAt: -1 });

    res.json({ success: true, count: projects.length, projects });
  } catch (error) {
    console.error("Get company projects error:", error);
    res.status(500).json({ success: false, message: "Error fetching company projects", error: error.message });
  }
});


router.get("/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(projectId)) return res.status(400).json({ success: false, message: "Invalid project ID" });

    const project = await ProjectCart.findById(projectId)
      .populate("client", "firstName lastName email userId")
      .populate("company", "name email");

    if (!project) return res.status(404).json({ success: false, message: "Project not found" });

    res.json({ success: true, project });
  } catch (error) {
    console.error("Get project error:", error);
    res.status(500).json({ success: false, message: "Error fetching project", error: error.message });
  }
});


router.put("/:projectId/status", async (req, res) => {
  try {
    const { projectId } = req.params;
    const { status, changedBy, notes } = req.body;

    if (!status) return res.status(400).json({ success: false, message: "Status is required" });
    if (!mongoose.Types.ObjectId.isValid(projectId)) return res.status(400).json({ success: false, message: "Invalid project ID" });

    const project = await ProjectCart.findById(projectId);
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });

    project.status = status;
    project.statusHistory.push({ status, changedAt: new Date(), changedBy: changedBy || "system", notes: notes || `Status changed to ${status}` });
    await project.save();

    const updatedProject = await ProjectCart.findById(projectId)
      .populate("client", "firstName lastName email userId")
      .populate("company", "name email");

    res.json({ success: true, message: "Status updated", project: updatedProject });
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ success: false, message: "Error updating status", error: error.message });
  }
});



export default router;
