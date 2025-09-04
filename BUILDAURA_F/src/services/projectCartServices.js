const API_URL = "http://localhost:5000/api/projectcart";

// ======================
// Submit a new project
// ======================
export const submitProject = async (projectData) => {
  try {
    const clientId = projectData.clientId || localStorage.getItem("userId");

    if (!clientId) throw new Error("Client ID is required");

    const res = await fetch(`${API_URL}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...projectData, clientId }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to submit project");

    return data;
  } catch (err) {
    console.error("submitProject error:", err.message);
    throw err;
  }
};

// ======================
// Get projects for a client
// ======================
export const getClientProjects = async (clientId) => {
  try {
    const id = clientId || localStorage.getItem("userId");

    if (!id) throw new Error("Invalid Client ID");

    const res = await fetch(`${API_URL}/client/${id}`);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to fetch client projects");

    return data;
  } catch (err) {
    console.error("getClientProjects error:", err.message);
    throw err;
  }
};

// ======================
// Get projects for a company
// ======================
export const getCompanyProjects = async (companyId) => {
  try {
    if (!companyId) throw new Error("Invalid Company ID");

    const res = await fetch(`${API_URL}/company/${companyId}`);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to fetch company projects");

    return data;
  } catch (err) {
    console.error("getCompanyProjects error:", err.message);
    throw err;
  }
};

// ======================
// Update project status
// ======================
export const updateProjectStatus = async (projectId, status) => {
  try {
    if (!projectId) throw new Error("Project ID is required");

    const res = await fetch(`${API_URL}/status/${projectId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to update project status");

    return data;
  } catch (err) {
    console.error("updateProjectStatus error:", err.message);
    throw err;
  }
};
