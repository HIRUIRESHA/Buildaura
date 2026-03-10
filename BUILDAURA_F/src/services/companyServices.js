const API_URL = "http://localhost:5000/api/companies"; 

// Register company
export const registerCompany = async (companyData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(companyData),
    });
    return await response.json();
  } catch (err) {
    console.error("Register company error:", err);
    return { success: false, message: "Server error" };
  }
};

//  Delete company (admin)
export const deleteCompany = async (companyId) => {
  try {
    const response = await fetch(`${API_URL}/delete/${companyId}`, {
      method: "DELETE",
    });
    return await response.json();
  } catch (err) {
    console.error("Delete company error:", err);
    return { success: false, message: "Server error" };
  }
};


export const editCompany = async (companyId, updatedData) => {
  try {
    const response = await fetch(`${API_URL}/edit/${companyId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    return await response.json();
  } catch (err) {
    console.error("Edit company error:", err);
    return { success: false, message: "Server error" };
  }
};


export const getCompanies = async () => {
  try {
    const response = await fetch(`${API_URL}/all`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  } catch (err) {
    console.error("Get companies error:", err);
    return { success: false, message: "Server error", companies: [] };
  }
};


export const getCompanyById = async (companyId) => {
  try {
    const response = await fetch(`${API_URL}/get/${companyId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  } catch (err) {
    console.error("Get company by ID error:", err);
    return { success: false, message: "Server error", company: null };
  }
};

export const getCompanyProfile = async (companyIdOrMongoId) => {
  try {
    const response = await fetch(`${API_URL}/get/${companyIdOrMongoId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  } catch (err) {
    console.error("Get company profile error:", err);
    return { success: false, message: "Server error", company: null };
  }
};
