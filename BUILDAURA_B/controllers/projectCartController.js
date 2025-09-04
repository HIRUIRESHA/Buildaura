import ProjectCart from "../models/projectCart.js";
import User from "../models/user.js";
import Company from "../models/company.js";

// ======================
// Submit a new project
// ======================
export const submitProject = async (req, res) => {
  try {
    // ✅ Get clientId from header if not in body
    const clientId = req.body.clientId || req.headers["x-user-id"];
    const {
      projectName,
      companyId,
      email,
      phoneNumber,
      startDate,
      budget,
      description,
      projectType,
    } = req.body;

    // validate client
    const client = await User.findOne({ userId: clientId });
    if (!client) return res.status(400).json({ message: "Invalid Client ID" });

    // validate company
    const company = await Company.findById(companyId);
    if (!company) return res.status(400).json({ message: "Invalid Company ID" });

    // create project
    const newProject = new ProjectCart({
      projectName,
      client: client._id,
      company: company._id,
      email,
      phoneNumber,
      startDate,
      budget,
      description,
      projectType,
      status: "pending", // default status
    });

    await newProject.save();
    res.status(201).json({ success: true, project: newProject });
  } catch (error) {
    console.error("submitProject error:", error.message);
    res.status(500).json({ message: "Server error while submitting project" });
  }
};

// ======================
// Get projects by client
// ======================
export const getClientProjects = async (req, res) => {
  try {
    const clientId = req.params.clientId;

    // find client
    const client = await User.findOne({ userId: clientId });
    if (!client) return res.status(400).json({ message: "Invalid Client ID" });

    const projects = await ProjectCart.find({ client: client._id }).populate(
      "company",
      "name email"
    );
    res.json({ success: true, projects });
  } catch (error) {
    console.error("getClientProjects error:", error.message);
    res.status(500).json({ message: "Error fetching client projects" });
  }
};

// ======================
// Get projects by company
// ======================
export const getCompanyProjects = async (req, res) => {
  try {
    const { companyId } = req.params;
    const projects = await ProjectCart.find({ company: companyId }).populate(
      "client",
      "firstName lastName email userId"
    );
    res.json({ success: true, projects });
  } catch (error) {
    console.error("getCompanyProjects error:", error.message);
    res.status(500).json({ message: "Error fetching company projects" });
  }
};

// ======================
// Update project status
// ======================
export const updateProjectStatus = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { status } = req.body;

    const project = await ProjectCart.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    project.status = status;
    await project.save();

    res.json({ success: true, project });
  } catch (error) {
    console.error("updateProjectStatus error:", error.message);
    res.status(500).json({ message: "Error updating project status" });
  }
};
