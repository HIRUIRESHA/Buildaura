const API_URL = "http://localhost:5000/api/users"; // Backend base URL

// 1️⃣ Register user
export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return await response.json();
};

// 2️⃣ Delete user (admin)
export const deleteUser = async (userId) => {
  const response = await fetch(`${API_URL}/delete/${userId}`, {
    method: "DELETE",
  });
  return await response.json();
};

// 3️⃣ Edit user (admin)
export const editUser = async (userId, updatedData) => {
  const response = await fetch(`${API_URL}/edit/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  return await response.json();
};

// 4️⃣ Get all users (admin dashboard)
export const getUsers = async () => {
  const response = await fetch(`${API_URL}/all`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
};

// 5️⃣ Get all engineers for a specific company
export const getCompanyEngineers = async (companyId) => {
  const response = await fetch(`${API_URL}/company/${companyId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
};
