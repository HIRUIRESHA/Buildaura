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

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      <span className="ml-4 text-gray-600">Loading data...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-8">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
            Submit New Project
          </h1>
          <p className="text-gray-600">Create a new project proposal with detailed information</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <svg className="w-7 h-7 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Project Details
            </h2>
          </div>

          <div className="p-8">
            {(loadingCompanies || loadingClients) ? (
              <LoadingSpinner />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-red-700 font-medium">{error}</p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Project Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="projectName"
                        placeholder="Enter project name"
                        value={form.projectName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors pl-12"
                        required
                        disabled={isSubmitting}
                      />
                      <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Client *
                    </label>
                    <div className="relative">
                      <select
                        name="clientId"
                        value={form.clientId}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors pl-12 appearance-none bg-white"
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
                      <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <svg className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Company *
                    </label>
                    <div className="relative">
                      <select
                        name="companyId"
                        value={form.companyId}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors pl-12 appearance-none bg-white"
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
                      <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                      </svg>
                      <svg className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="startDate"
                        value={form.startDate}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors pl-12"
                        required
                        disabled={isSubmitting}
                      />
                      <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Budget ($) *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="budget"
                        placeholder="0.00"
                        value={form.budget}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors pl-12"
                        required
                        disabled={isSubmitting}
                      />
                      <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Project Type
                    </label>
                    <div className="relative">
                      <select
                        name="projectType"
                        value={form.projectType}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors pl-12 appearance-none bg-white"
                        disabled={isSubmitting}
                      >
                        <option value="residential">🏠 Residential</option>
                        <option value="commercial">🏢 Commercial</option>
                        <option value="industrial">🏭 Industrial</option>
                        <option value="infrastructure">🛤️ Infrastructure</option>
                        <option value="renovation">🔨 Renovation</option>
                      </select>
                      <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <svg className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Project Description *
                    </label>
                    <div className="relative">
                      <textarea
                        name="description"
                        placeholder="Describe your project in detail..."
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors pl-12 resize-none"
                        required
                        rows="4"
                        disabled={isSubmitting}
                      />
                      <svg className="w-5 h-5 text-gray-400 absolute left-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform ${
                      isSubmitting 
                        ? "opacity-70 cursor-not-allowed scale-95" 
                        : "hover:from-orange-600 hover:to-amber-600 hover:shadow-lg hover:scale-105 active:scale-95"
                    } flex items-center justify-center`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting Project...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Submit Project
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCart;