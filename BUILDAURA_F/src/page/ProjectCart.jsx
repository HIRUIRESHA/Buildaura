import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { submitProject } from "../services/projectCartServices";

const COMPANY_API_URL = "http://localhost:5000/api/companies/all";

function ProjectCart() {
  const navigate = useNavigate();

  // ✅ Get logged-in client ID from localStorage
  const clientId = localStorage.getItem("userId"); 

  const [form, setForm] = useState({
    projectName: "",
    email: "",
    phoneNumber: "",
    startDate: "",
    budget: "",
    description: "",
    projectType: "residential",
    companyId: "",
  });

  const [companies, setCompanies] = useState([]);

  // Fetch companies for dropdown
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch(COMPANY_API_URL);
        const data = await res.json();
        if (data.success) {
          setCompanies(data.companies);
        }
      } catch (err) {
        console.error("Error fetching companies:", err.message);
      }
    };
    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clientId) {
      alert("⚠️ Client ID not found. Please login again.");
      return;
    }

    try {
      const projectData = { ...form, clientId }; // attach clientId
      const res = await submitProject(projectData);

      if (res.success) {
        alert("✅ Project submitted successfully!");
        navigate("/project");
      } else {
        alert("❌ Failed to submit project");
      }
    } catch (err) {
      alert("⚠️ " + err.message);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Submit a New Project</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="projectName"
          placeholder="Project Name"
          value={form.projectName}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Client Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
          required
        />

        <input
          type="text"
          name="phoneNumber"
          placeholder="Client Phone"
          value={form.phoneNumber}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
          required
        />

        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
          required
        />

        <input
          type="number"
          name="budget"
          placeholder="Budget"
          value={form.budget}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
          required
        />

        <textarea
          name="description"
          placeholder="Project Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
          required
        />

        <select
          name="projectType"
          value={form.projectType}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
        >
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="industrial">Industrial</option>
          <option value="infrastructure">Infrastructure</option>
          <option value="renovation">Renovation</option>
        </select>

        <select
          name="companyId"
          value={form.companyId}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
          required
        >
          <option value="">Select Company</option>
          {companies.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded-lg w-full"
        >
          Submit Project
        </button>
      </form>
    </div>
  );
}

export default ProjectCart;
