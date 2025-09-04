const API_URL = "http://localhost:5000/api/companycarts";

// Create cart
export const createCompanyCart = async (formData) => {
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    body: formData,
  });
  return res.json();
};

// Get all carts
export const getCarts = async () => {
  try {
    const res = await fetch(`${API_URL}`);
    if (!res.ok) throw new Error("Failed to fetch carts");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getCarts:", error);
    return [];
  }
};

// Get cart by ID
export const getCompanyCartById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};

// Update cart
export const updateCompanyCart = async (id, formData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    body: formData,
  });
  return res.json();
};

// Delete cart
export const deleteCompanyCart = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
};
