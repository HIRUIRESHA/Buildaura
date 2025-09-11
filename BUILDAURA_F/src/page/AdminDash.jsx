
// src/pages/AdminDash.jsx
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getUsers, deleteUser } from "../services/userServices";
import { getCompanies, deleteCompany } from "../services/companyServices";
import { getCarts, deleteCompanyCart } from "../services/companyCartServices";
import { getClientProjects, getAllProjects, updateProjectStatus } from "../services/projectCartServices";

const AdminDash = () => {
  const [activeTab, setActiveTab] = useState("users");

  // =========================
  // Users
  // =========================
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data || []);
    } catch (err) {
      console.error("Fetch users error:", err);
      toast.error("Failed to fetch users");
    }
  };
  const handleDeleteUser = async (id) => {
    if (window.confirm("Delete this user?")) {
      try {
        await deleteUser(id);
        toast.info("User deleted");
        fetchUsers();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete user");
      }
    }
  };

  // =========================
  // Companies
  // =========================
  const [companies, setCompanies] = useState([]);
  const fetchCompanies = async () => {
    try {
      const data = await getCompanies();
      setCompanies(data.companies || []);
    } catch (err) {
      console.error("Fetch companies error:", err);
      toast.error("Failed to fetch companies");
    }
  };
  const handleDeleteCompany = async (id) => {
    if (window.confirm("Delete this company?")) {
      try {
        await deleteCompany(id);
        toast.info("Company deleted");
        fetchCompanies();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete company");
      }
    }
  };

  // =========================
  // Company Carts
  // =========================
  const [companyCarts, setCompanyCarts] = useState([]);
  const fetchCarts = async () => {
    try {
      const data = await getCarts();
      setCompanyCarts(data || []);
    } catch (err) {
      console.error("Fetch carts error:", err);
      toast.error("Failed to fetch company carts");
    }
  };
  const handleDeleteCart = async (id) => {
    if (window.confirm("Delete this cart?")) {
      try {
        await deleteCompanyCart(id);
        toast.info("Company cart deleted");
        fetchCarts();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete cart");
      }
    }
  };

  // =========================
  // Projects
  // =========================
  const [projects, setProjects] = useState([]);
  const fetchProjects = async () => {
    try {
      const storedAuth = JSON.parse(localStorage.getItem("auth"));
      const role = storedAuth?.role;
      const userId = storedAuth?.user?._id;

      let data;

      if (role === "admin") {
        data = await getAllProjects();
      } else if (role === "client") {
        if (!userId) throw new Error("Invalid Client ID");
        data = await getClientProjects(userId);
      } else {
        console.warn("Unknown role:", role);
        setProjects([]);
        return;
      }


      setProjects(Array.isArray(data) ? data : data.projects || []);
    } catch (err) {
      console.error("Fetch projects error:", err);
      toast.error("Failed to fetch projects");
      setProjects([]);
    }
  };

  const handleUpdateStatus = async (projectId, currentStatus) => {
    const nextStatus = prompt("Enter new status for this project:", currentStatus);
    if (!nextStatus) return;
    try {
      await updateProjectStatus(projectId, nextStatus);
      toast.success("Project status updated");
      fetchProjects();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update project status");
    }
  };

  // =========================
  // Modal
  // =========================
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalContent(null);
    setModalOpen(false);
  };

  // =========================
  // Fetch all data on mount
  // =========================
  useEffect(() => {
    fetchUsers();
    fetchCompanies();
    fetchCarts();
    fetchProjects();
  }, []);

  // Status badge component
  const StatusBadge = ({ status }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case "approved": return "bg-green-100 text-green-800 border-green-200";
        case "pending_approval": return "bg-yellow-100 text-yellow-800 border-yellow-200";
        case "rejected": return "bg-red-100 text-red-800 border-red-200";
        case "in_progress": return "bg-blue-100 text-blue-800 border-blue-200";
        case "completed": return "bg-purple-100 text-purple-800 border-purple-200";
        case "hold": return "bg-orange-100 text-orange-800 border-orange-200";
        case "pending_start": return "bg-gray-100 text-gray-800 border-gray-200";
        default: return "bg-gray-100 text-gray-800 border-gray-200";
      }
    };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(status)}`}>
        {status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </span>
    );
  };

  const tabConfig = {
    users: { icon: "👥", label: "Users", color: "blue" },
    companies: { icon: "🏢", label: "Companies", color: "purple" },
    carts: { icon: "🛒", label: "Carts", color: "green" },
    projects: { icon: "📋", label: "Projects", color: "orange" }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "users":
        return (
          // ... same JSX as your original "users" tab
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">User ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Role</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center">
                          <div className="text-6xl mb-4">👤</div>
                          <p className="text-lg font-medium">No users found</p>
                          <p className="text-sm text-gray-400">Users will appear here once they register</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    users.map((user, index) => (
                      <tr key={user._id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                        <td className="px-6 py-4">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">
                            {user.userId || `U-${index + 1}`}
                          </span>
                        </td>
                        <td className="px-6 py-4 flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                            {user.firstName?.[0]?.toUpperCase()}{user.lastName?.[0]?.toUpperCase()}
                          </div>
                          <div>{user.firstName} {user.lastName}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.role === 'admin' ? 'bg-red-100 text-red-800' : 
                            user.role === 'client' ? 'bg-blue-100 text-blue-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>{user.role}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            className="bg-red-500 hover:bg-red-600 px-4 py-2 text-white text-sm rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                            onClick={() => handleDeleteUser(user._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "companies":
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Company ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Size</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Industry</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {companies.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center">
                          <div className="text-6xl mb-4">🏢</div>
                          <p className="text-lg font-medium">No companies found</p>
                          <p className="text-sm text-gray-400">Companies will appear here once they register</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    companies.map((company, index) => (
                      <tr key={company._id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                        <td className="px-6 py-4">
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-mono">
                            {company.companyId || `C-${index + 1}`}
                          </span>
                        </td>
                        <td className="px-6 py-4 flex items-center gap-2">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white font-semibold">
                            {company.name?.[0]?.toUpperCase()}
                          </div>
                          <div className="font-medium text-gray-900">{company.name}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{company.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{company.companySize || "-"}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{company.industry || "-"}</td>
                        <td className="px-6 py-4 text-center">
                          <button
                            className="bg-red-500 hover:bg-red-600 px-4 py-2 text-white text-sm rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                            onClick={() => handleDeleteCompany(company._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "carts":
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Company ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Company</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Experience</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Specialization</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {companyCarts.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center">
                          <div className="text-6xl mb-4">🛒</div>
                          <p className="text-lg font-medium">No carts found</p>
                          <p className="text-sm text-gray-400">Company carts will appear here</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    companyCarts.map((cart, index) => (
                      <tr key={cart._id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                        <td className="px-6 py-4">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono">
                            {cart.companyId || "-"}
                          </span>
                        </td>
                        <td className="px-6 py-4 flex items-center gap-2">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center text-white font-semibold">
                            {cart.companyName?.[0]?.toUpperCase()}
                          </div>
                          <div className="font-medium text-gray-900">{cart.companyName}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{cart.experience}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{cart.location}</td>
                        <td className="px-6 py-4">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">{cart.specialization}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex gap-2 justify-center">
                            <button 
                              className="bg-blue-500 hover:bg-blue-600 px-3 py-1 text-white text-sm rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md" 
                              onClick={() => openModal(cart)}
                            >
                              View
                            </button>
                            <button 
                              className="bg-red-500 hover:bg-red-600 px-3 py-1 text-white text-sm rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md" 
                              onClick={() => handleDeleteCart(cart._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "projects":
      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-orange-50 to-yellow-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Project ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Client</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Budget</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <div className="text-6xl mb-4">📋</div>
                        <p className="text-lg font-medium">No projects found</p>
                        <p className="text-sm text-gray-400">Projects will appear here once they are created</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  projects.map((project, index) => (
                    <tr key={project.id || project._id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                      <td className="px-6 py-4 font-mono text-sm">{(project.id || project._id).slice(-6).toUpperCase()}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">{project.projectName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{project.clientName || "N/A"}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{project.projectType || "N/A"}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{project.budget ?? "-"}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={project.status || "pending"} />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex gap-2 justify-center">
                          <button
                            className="bg-blue-500 hover:bg-blue-600 px-3 py-1 text-white text-sm rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                            onClick={() => openModal(project)}
                          >
                            View
                          </button>
                          <button
                            className="bg-green-500 hover:bg-green-600 px-3 py-1 text-white text-sm rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                            onClick={() => handleUpdateStatus(project.id || project._id, project.status)}
                          >
                            Update Status
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <ToastContainer position="top-right" theme="light" />
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Manage your platform with ease</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-2 flex gap-1 border border-gray-200">
            {Object.entries(tabConfig).map(([tab, config]) => (
              <button
                key={tab}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab 
                    ? `bg-gradient-to-r from-${config.color}-500 to-${config.color}-600 text-white shadow-lg shadow-${config.color}-500/25` 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                <span className="text-lg">{config.icon}</span>
                {config.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-300 ease-in-out">
          {renderTabContent()}
        </div>

        {/* Modal */}
        {modalOpen && modalContent && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                <h3 className="text-xl font-semibold text-gray-900">Details</h3>
                <button 
                  className="w-8 h-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors flex items-center justify-center font-bold"
                  onClick={closeModal}
                >
                  ×
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
                <pre className="whitespace-pre-wrap text-sm bg-gray-50 rounded-lg p-4 border overflow-x-auto">
                  {JSON.stringify(modalContent, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDash;
