const API_URL = "http://localhost:5000/api/projectcart";


export const submitProject = async (projectData) => {
  try {
    const clientId =
      projectData.clientId ||
      localStorage.getItem("userId") ||
      localStorage.getItem("_id");
    const companyId = projectData.companyId || localStorage.getItem("companyId");

    if (!clientId) throw new Error("Client ID is required");
    if (!companyId) throw new Error("Company ID is required");

    const res = await fetch(`${API_URL}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": clientId,
      },
      body: JSON.stringify({
        ...projectData,
        clientId,
        companyId,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || `Failed to submit project`);

    return data;
  } catch (err) {
    console.error("submitProject error:", err.message);
    throw err;
  }
};


export const getClientProjects = async (clientId) => {
  try {
    const id =
      clientId ||
      JSON.parse(localStorage.getItem("auth"))?.user?.userId ||
      JSON.parse(localStorage.getItem("auth"))?.user?._id;

    if (!id) throw new Error("Invalid Client ID");

    const res = await fetch(`${API_URL}/client/${encodeURIComponent(id)}`, {
      headers: { "x-user-id": id, "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch client projects");

    return data;
  } catch (err) {
    console.error("getClientProjects error:", err.message);
    throw err;
  }
};


export const getCompanyProjects = async (companyId) => {
  try {
    const id = companyId || JSON.parse(localStorage.getItem("auth"))?.user?._id;
    if (!id) throw new Error("Invalid Company ID");

    const res = await fetch(`${API_URL}/company/${encodeURIComponent(id)}`, {
      headers: { "x-company-id": id },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch company projects");

    return data;
  } catch (err) {
    console.error("getCompanyProjects error:", err.message);
    throw err;
  }
};


export const getAllProjects = async (filters = {}) => {
  try {
    const query = new URLSearchParams(filters).toString();
    const url = query ? `${API_URL}/all?${query}` : `${API_URL}/all`;

    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch all projects");

    return Array.isArray(data) ? data : data.projects || [];
  } catch (err) {
    console.error("getAllProjects error:", err.message);
    throw err;
  }
};


export const getProjectById = async (projectId) => {
  try {
    const res = await fetch(`${API_URL}/${projectId}`, {
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch project");
    return data;
  } catch (err) {
    console.error("getProjectById error:", err.message);
    throw err;
  }
};


export const updateProjectStatus = async (projectId, status, engineerId = null, notes = "") => {
  try {
    const res = await fetch(`${API_URL}/${projectId}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, engineerId, notes }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update status");
    return data;
  } catch (err) {
    console.error("updateProjectStatus error:", err.message);
    throw err;
  }
};


export const assignEngineerToProject = async (projectId, engineerId) => {
  try {
    const res = await fetch(`${API_URL}/assign/${projectId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ engineerId }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to assign engineer");
    return data;
  } catch (err) {
    console.error("assignEngineerToProject error:", err.message);
    throw err;
  }
};


export const deleteProject = async (projectId) => {
  throw new Error("deleteProject route not implemented in backend");
};


export const updateProject = async (projectId, updateData) => {
  throw new Error("updateProject route not implemented in backend");
};
