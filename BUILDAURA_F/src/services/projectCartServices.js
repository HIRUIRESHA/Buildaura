// services/projectCartServices.js
const API_URL = "http://localhost:5000/api/projectcart";

// ======================
// Submit a new project
// ======================
export const submitProject = async (projectData) => {
  try {
    const clientId = projectData.clientId || localStorage.getItem("userId");
    const companyId = projectData.companyId || localStorage.getItem("companyId");

    if (!clientId) throw new Error("Client ID is required");
    if (!companyId) throw new Error("Company ID is required");

    const res = await fetch(`${API_URL}/submit`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "x-user-id": clientId // Send in headers for middleware
      },
      body: JSON.stringify({ 
        ...projectData, 
        clientId,
        companyId 
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || `Failed to submit project: ${res.status} ${res.statusText}`);
    }

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
    // Get the ID from parameter or localStorage
    const id = clientId || localStorage.getItem("userId") || localStorage.getItem("userid");
    
    if (!id) {
      console.error("❌ No client ID provided");
      throw new Error("Invalid Client ID");
    }

    console.log("📞 Fetching projects for client ID:", id);
    
    const res = await fetch(`${API_URL}/client/${encodeURIComponent(id)}`, {
      headers: {
        "x-user-id": id,
        "Content-Type": "application/json"
      }
    });
    
    const data = await res.json();
    console.log("📨 API response:", data);

    if (!res.ok) {
      throw new Error(data.message || `Failed to fetch client projects: ${res.status}`);
    }

    return data;
  } catch (err) {
    console.error("❌ getClientProjects error:", err.message);
    throw err;
  }
};

// ======================
// Get projects for a company
// ======================
export const getCompanyProjects = async (companyId) => {
  try {
    const id = companyId || localStorage.getItem("_id");

    if (!id) throw new Error("Invalid Company ID");

    const res = await fetch(`${API_URL}/company/${id}`, {
      headers: {
        "x-company-id": id // Send in headers for middleware
      }
    });
    
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || `Failed to fetch company projects: ${res.status} ${res.statusText}`);
    }

    return data;
  } catch (err) {
    console.error("getCompanyProjects error:", err.message);
    throw err;
  }
};

// ======================
// Get all projects (Admin)
// ======================
export const getAllProjects = async (filters = {}) => {
  try {
    // Build query string from filters
    const queryParams = new URLSearchParams();
    if (filters.page) queryParams.append('page', filters.page);
    if (filters.limit) queryParams.append('limit', filters.limit);
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.clientId) queryParams.append('clientId', filters.clientId);
    if (filters.companyId) queryParams.append('companyId', filters.companyId);

    const queryString = queryParams.toString();
    const url = queryString ? `${API_URL}?${queryString}` : API_URL;

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || `Failed to fetch projects: ${res.status} ${res.statusText}`);
    }

    return data;
  } catch (err) {
    console.error("getAllProjects error:", err.message);
    throw err;
  }
};

// ======================
// Get single project by ID
// ======================
export const getProjectById = async (projectId) => {
  try {
    if (!projectId) throw new Error("Project ID is required");

    const res = await fetch(`${API_URL}/${projectId}`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || `Failed to fetch project: ${res.status} ${res.statusText}`);
    }

    return data;
  } catch (err) {
    console.error("getProjectById error:", err.message);
    throw err;
  }
};

// ======================
// Update project status
// ======================
export const updateProjectStatus = async (projectId, status, notes = "") => {
  try {
    if (!projectId) throw new Error("Project ID is required");
    if (!status) throw new Error("Status is required");

    const changedBy = localStorage.getItem("userId") || "system";

    const res = await fetch(`${API_URL}/${projectId}/status`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "x-user-id": changedBy // Send in headers for middleware
      },
      body: JSON.stringify({ 
        status, 
        changedBy,
        notes 
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || `Failed to update project status: ${res.status} ${res.statusText}`);
    }

    return data;
  } catch (err) {
    console.error("updateProjectStatus error:", err.message);
    throw err;
  }
};

// ======================
// Delete a project
// ======================
export const deleteProject = async (projectId) => {
  try {
    if (!projectId) throw new Error("Project ID is required");

    const changedBy = localStorage.getItem("userId");

    const res = await fetch(`${API_URL}/${projectId}`, {
      method: "DELETE",
      headers: {
        "x-user-id": changedBy // Send in headers for middleware
      }
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || `Failed to delete project: ${res.status} ${res.statusText}`);
    }

    return data;
  } catch (err) {
    console.error("deleteProject error:", err.message);
    throw err;
  }
};

// ======================
// Update project details
// ======================
export const updateProject = async (projectId, updateData) => {
  try {
    if (!projectId) throw new Error("Project ID is required");

    const changedBy = localStorage.getItem("userId");

    const res = await fetch(`${API_URL}/${projectId}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        "x-user-id": changedBy // Send in headers for middleware
      },
      body: JSON.stringify(updateData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || `Failed to update project: ${res.status} ${res.statusText}`);
    }

    return data;
  } catch (err) {
    console.error("updateProject error:", err.message);
    throw err;
  }
};