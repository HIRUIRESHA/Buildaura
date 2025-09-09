// routes/projectcartRoutes.js
import express from "express";
import ProjectCart from "../models/projectcart.js";
import User from "../models/user.js";
import Company from "../models/company.js";

const router = express.Router();

// ======================
// POST /api/projectcart/submit
// Submit a new project
// ======================
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

    // Validate required fields
    if (
      !projectName ||
      !clientId ||
      !companyId ||
      !startDate ||
      !budget ||
      !description ||
      !projectType
    ) {
      return res
        .status(400)
        .json({ 
          success: false, 
          message: "All fields are required: projectName, clientId, companyId, startDate, budget, description, projectType" 
        });
    }

    // Validate client - support both ObjectId and custom userId
    let client;
    if (/^[0-9a-fA-F]{24}$/.test(clientId)) {
      client = await User.findById(clientId);
    } else {
      client = await User.findOne({ userId: clientId });
    }
    
    if (!client || client.role !== "client") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Client ID or user is not a client" });
    }

    // Validate company
    const company = await Company.findById(companyId);
    if (!company) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Company ID" });
    }

    // Validate budget is a positive number
    if (isNaN(budget) || budget <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Budget must be a positive number" });
    }

    // Validate start date is in the future
    const startDateObj = new Date(startDate);
    if (startDateObj <= new Date()) {
      return res
        .status(400)
        .json({ success: false, message: "Start date must be in the future" });
    }

    // Create new project
    const newProject = new ProjectCart({
      projectName,
      client: client._id, // store MongoDB ObjectId
      company: company._id, // store MongoDB ObjectId
      startDate: startDateObj,
      budget: parseFloat(budget),
      description,
      projectType,
      status,
      statusHistory: [
        {
          status: status,
          changedAt: new Date(),
          changedBy: client._id,
          notes: "Project created"
        },
      ],
    });

    await newProject.save();

    // Populate client and company for response
    const populatedProject = await ProjectCart.findById(newProject._id)
      .populate("client", "firstName lastName email userId")
      .populate("company", "name email");

    res.status(201).json({
      success: true,
      message: "Project submitted successfully",
      project: populatedProject,
    });
  } catch (error) {
    console.error("Submit project error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error while submitting project",
      error: error.message 
    });
  }
});

// ======================
// GET /api/projectcart/client/:clientId
// ======================
router.get("/client/:clientId", async (req, res) => {
  try {
    const { clientId } = req.params;
    const { status } = req.query;

    console.log("🔍 Looking for projects for client:", clientId);
    
    // FIX: Handle both ObjectId and custom userId formats
    let filter;
    if (/^[0-9a-fA-F]{24}$/.test(clientId)) {
      // It's a MongoDB ObjectId
      filter = { client: clientId };
    } else {
      // It's a custom userId (like "CLI-0001") - find the user first
      const user = await User.findOne({ 
        $or: [
          { userId: clientId },
          { _id: clientId }
        ] 
      });
      
      if (!user) {
        console.log("❌ Client not found with ID:", clientId);
        return res.status(404).json({ 
          success: false, 
          message: "Client not found" 
        });
      }
      
      filter = { client: user._id };
      console.log("✅ Found user:", user._id, "for custom ID:", clientId);
    }

    if (status && status !== 'all') {
      filter.status = status;
    }

    console.log("📋 Using filter:", filter);

    const projects = await ProjectCart.find(filter)
      .populate("client", "firstName lastName email userId")
      .populate("company", "name email")
      .sort({ createdAt: -1 });

    console.log("✅ Found projects:", projects.length);

    res.json({ 
      success: true, 
      count: projects.length,
      projects 
    });
  } catch (error) {
    console.error("❌ Get client projects error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching client projects",
      error: error.message 
    });
  }
});

// ======================
// GET /api/projectcart/company/:companyId
// Get all projects by company
// ======================
router.get("/company/:companyId", async (req, res) => {
  try {
    const { companyId } = req.params;
    const { status } = req.query;

    // Build filter object
    const filter = { company: companyId };
    if (status && status !== 'all') {
      filter.status = status;
    }

    const projects = await ProjectCart.find(filter)
      .populate("client", "firstName lastName email userId")
      .populate("company", "name email")
      .sort({ createdAt: -1 });

    res.json({ 
      success: true, 
      count: projects.length,
      projects 
    });
  } catch (error) {
    console.error("Get company projects error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching company projects",
      error: error.message 
    });
  }
});

// ======================
// GET /api/projectcart/:projectId
// Get single project by ID
// ======================
router.get("/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await ProjectCart.findById(projectId)
      .populate("client", "firstName lastName email userId")
      .populate("company", "name email");

    if (!project) {
      return res.status(404).json({ 
        success: false, 
        message: "Project not found" 
      });
    }

    res.json({ 
      success: true, 
      project 
    });
  } catch (error) {
    console.error("Get project error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching project",
      error: error.message 
    });
  }
});

// ======================
// PUT /api/projectcart/:projectId/status
// Update project status
// ======================
router.put("/:projectId/status", async (req, res) => {
  try {
    const { projectId } = req.params;
    const { status, changedBy, notes } = req.body;

    if (!status) {
      return res.status(400).json({ 
        success: false, 
        message: "Status is required" 
      });
    }

    const project = await ProjectCart.findById(projectId);
    if (!project) {
      return res.status(404).json({ 
        success: false, 
        message: "Project not found" 
      });
    }

    // Update status and add to history
    project.status = status;
    project.statusHistory.push({
      status,
      changedAt: new Date(),
      changedBy: changedBy || "system",
      notes: notes || `Status changed to ${status}`
    });

    await project.save();

    const updatedProject = await ProjectCart.findById(projectId)
      .populate("client", "firstName lastName email userId")
      .populate("company", "name email");

    res.json({ 
      success: true, 
      message: "Project status updated successfully",
      project: updatedProject 
    });
  } catch (error) {
    console.error("Update project status error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error updating project status",
      error: error.message 
    });
  }
});

// ======================
// GET /api/projectcart
// Get all projects (for admin)
// ======================
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, status, clientId, companyId } = req.query;
    
    // Build filter object
    const filter = {};
    if (status && status !== 'all') {
      filter.status = status;
    }
    if (clientId) {
      filter.client = clientId;
    }
    if (companyId) {
      filter.company = companyId;
    }
    
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      populate: [
        { path: 'client', select: 'firstName lastName userId' },
        { path: 'company', select: 'name email' }
      ],
      sort: { createdAt: -1 }
    };

    const projects = await ProjectCart.paginate(filter, options);

    res.json({ 
      success: true, 
      ...projects 
    });
  } catch (error) {
    console.error("Get all projects error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching all projects",
      error: error.message 
    });
  }
});

export default router;