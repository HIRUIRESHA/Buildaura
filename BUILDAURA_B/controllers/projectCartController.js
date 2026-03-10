
import ProjectCart from "../models/projectcart.js";
import User from "../models/user.js";
import Company from "../models/company.js";

// Submit a new project
export const submitProject = async (req, res) => {
  try {
    const {
      projectName,
      companyId,
      clientId,
      startDate,
      budget,
      description,
      projectType,
      status = "pending"
    } = req.body;

    // Validate required fields
    if (!projectName || !companyId || !clientId || !startDate || !budget || !description || !projectType) {
      return res.status(400).json({ 
        success: false, 
        message: "All fields are required: projectName, companyId, clientId, startDate, budget, description, projectType" 
      });
    }

    // Validate client
    const client = await User.findOne({ 
      $or: [
        { _id: clientId },
        { userId: clientId }
      ],
      role: "client"
    });
    
    if (!client) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid Client ID or user is not a client" 
      });
    }

    // Validate company
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid Company ID" 
      });
    }

    // Create new project
    const newProject = new ProjectCart({
      projectName,
      client: client._id, 
      company: company._id, 
      startDate,
      budget,
      description,
      projectType,
      status,
      statusHistory: [
        {
          status: status,
          changedAt: new Date(),
          changedBy: client._id,
        },
      ],
    });

    await newProject.save();

    // Populate client and company for frontend display
    const populatedProject = await ProjectCart.findById(newProject._id)
      .populate("client", "firstName lastName email userId")
      .populate("company", "name email");

    res.status(201).json({ 
      success: true, 
      message: "Project created successfully",
      project: populatedProject 
    });
  } catch (error) {
    console.error("submitProject error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error while submitting project",
      error: error.message 
    });
  }
};

// Get projects by client
export const getClientProjects = async (req, res) => {
  try {
    const { clientId } = req.params;

    // client by ObjectId or userId
    const client = await User.findOne({
      $or: [
        { _id: clientId },
        { userId: clientId }
      ],
      role: "client"
    });

    if (!client) {
      return res.status(404).json({ 
        success: false, 
        message: "Client not found" 
      });
    }

    const projects = await ProjectCart.find({ client: client._id })
      .populate("company", "name email")
      .populate("client", "firstName lastName userId")
      .sort({ createdAt: -1 });

    res.json({ 
      success: true, 
      count: projects.length,
      projects 
    });
  } catch (error) {
    console.error("getClientProjects error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching client projects",
      error: error.message 
    });
  }
};

// Get projects by company
export const getCompanyProjects = async (req, res) => {
  try {
    const { companyId } = req.params;

    let company;

    // Check if it's a valid ObjectId
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(companyId);

    if (isValidObjectId) {
      company = await Company.findById(companyId);
    } else {
      // Otherwise, look up by companyId field (CMP-0001)
      company = await Company.findOne({ companyId: companyId });
    }

    if (!company) {
      return res.status(404).json({
        success: false,
        message: `Company not found for identifier: ${companyId}`
      });
    }

    const projects = await ProjectCart.find({ company: company._id })
      .populate("client", "firstName lastName email userId")
      .populate("company", "name email companyId")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: projects.length,
      projects
    });
  } catch (error) {
    console.error("getCompanyProjects error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching company projects",
      error: error.message
    });
  }
};

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    // Build filter object
    const filter = {};
    if (status && status !== 'all') {
      filter.status = status;
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
    console.error("getAllProjects error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching all projects",
      error: error.message 
    });
  }
};

// Update project status
export const updateProjectStatus = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { status, changedBy } = req.body;

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

    project.status = status;
    project.statusHistory.push({
      status,
      changedAt: new Date(),
      changedBy: changedBy || req.userId || "system",
    });

    await project.save();

    const populatedProject = await ProjectCart.findById(project._id)
      .populate("client", "firstName lastName email userId")
      .populate("company", "name email");

    res.json({ 
      success: true, 
      message: "Project status updated successfully",
      project: populatedProject 
    });
  } catch (error) {
    console.error("updateProjectStatus error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error updating project status",
      error: error.message 
    });
  }
};

// Get single project by ID
export const getProjectById = async (req, res) => {
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
    console.error("getProjectById error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching project",
      error: error.message 
    });
  }
};