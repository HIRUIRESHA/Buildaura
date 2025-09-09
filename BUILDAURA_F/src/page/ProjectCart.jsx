import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { submitProject } from "../services/projectCartServices";

const COMPANY_API_URL = "http://localhost:5000/api/companies/all";
const CLIENT_API_URL = "http://localhost:5000/api/clients/all";

function ProjectCart() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    projectName: "",
    startDate: "",
    budget: "",
    description: "",
    projectType: "residential",
    companyId: "",
    clientId: "",
    status: "pending",
  });

  const [companies, setCompanies] = useState([]);
  const [clients, setClients] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [loadingClients, setLoadingClients] = useState(true);
  const [error, setError] = useState("");

  // Fetch companies
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch(COMPANY_API_URL);
        const data = await res.json();
        if (data.success) setCompanies(data.companies);
        else setError("Failed to fetch companies");
      } catch (err) {
        setError("Error fetching companies: " + err.message);
      } finally {
        setLoadingCompanies(false);
      }
    };
    fetchCompanies();
  }, []);

  // Fetch clients
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch(CLIENT_API_URL);
        const data = await res.json();
        if (data.success) setClients(data.clients);
        else setError("Failed to fetch clients");
      } catch (err) {
        setError("Error fetching clients: " + err.message);
      } finally {
        setLoadingClients(false);
      }
    };
    fetchClients();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!form.clientId) {
      setError("⚠️ Please select a client.");
      setIsSubmitting(false);
      return;
    }

    if (!form.companyId) {
      setError("⚠️ Please select a company.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await submitProject(form);
      if (res.success) {
        navigate("/project", { state: { refresh: true } });
      } else {
        setError("❌ Failed to submit project");
      }
    } catch (err) {
      setError("⚠️ " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Submit a New Project</h1>

      {(loadingCompanies || loadingClients) ? (
        <p>Loading data...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}

          <input
            type="text"
            name="projectName"
            placeholder="Project Name"
            value={form.projectName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
            disabled={isSubmitting}
          />

          <select
            name="clientId"
            value={form.clientId}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
            disabled={isSubmitting}
          >
            <option value="">Select Client</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.firstName} {client.lastName}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
            disabled={isSubmitting}
          />

          <input
            type="number"
            name="budget"
            placeholder="Budget"
            value={form.budget}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
            disabled={isSubmitting}
          />

          <textarea
            name="description"
            placeholder="Project Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
            rows="4"
            disabled={isSubmitting}
          />

          <select
            name="projectType"
            value={form.projectType}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            disabled={isSubmitting}
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
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
            disabled={isSubmitting}
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
            disabled={isSubmitting}
            className={`bg-orange-500 text-white px-4 py-2 rounded-lg w-full transition ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-orange-600"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Project"}
          </button>
        </form>
      )}
    </div>
  );
}

export default ProjectCart;
