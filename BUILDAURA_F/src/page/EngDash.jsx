// src/pages/EngineerDash.jsx
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getClientProjects, updateProjectStatus } from "../services/projectCartServices";
import { getCarts } from "../services/companyCartServices";

const EngDash = () => {
  const [activeTab, setActiveTab] = useState("projects");

  // =========================
  // Projects assigned to engineer
  // =========================
  const [projects, setProjects] = useState([]);
  const fetchProjects = async () => {
    try {
      const engineerId = localStorage.getItem("userMongoId"); // engineer ID
      const data = await getClientProjects(engineerId); // get projects assigned to this engineer
      setProjects(data.projects || []);
    } catch (err) {
      console.error("Fetch projects error:", err);
      toast.error("Failed to fetch projects");
    }
  };

  const handleUpdateStatus = async (projectId, status) => {
    try {
      await updateProjectStatus(projectId, status);
      toast.success("Project status updated");
      fetchProjects();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
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
  // Fetch data on mount
  // =========================
  useEffect(() => {
    fetchProjects();
    fetchCarts();
  }, []);

  // =========================
  // Tab content
  // =========================
  const renderTabContent = () => {
    switch (activeTab) {
      case "projects":
        return (
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border px-2 py-1">Project</th>
                <th className="border px-2 py-1">Client</th>
                <th className="border px-2 py-1">Company</th>
                <th className="border px-2 py-1">Budget</th>
                <th className="border px-2 py-1">Status</th>
                <th className="border px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">No projects found</td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project._id}>
                    <td className="border px-2 py-1">{project.projectName}</td>
                    <td className="border px-2 py-1">{project.client?.firstName} {project.client?.lastName}</td>
                    <td className="border px-2 py-1">{project.company?.name}</td>
                    <td className="border px-2 py-1">{project.budget}</td>
                    <td className="border px-2 py-1">{project.status}</td>
                    <td className="border px-2 py-1 flex gap-2">
                      <button className="bg-blue-500 px-2 py-1 text-white rounded" onClick={() => openModal(project)}>View</button>
                      <select
                        className="border rounded p-1"
                        value={project.status}
                        onChange={(e) => handleUpdateStatus(project._id, e.target.value)}
                      >
                        <option value="pending_approval">Pending Approval</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="in_progress">In Progress</option>
                        <option value="hold">Hold</option>
                        <option value="completed">Completed</option>
                        <option value="pending_start">Pending Start</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        );

      case "companyCarts":
        return (
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border px-2 py-1">Company</th>
                <th className="border px-2 py-1">Experience</th>
                <th className="border px-2 py-1">Location</th>
                <th className="border px-2 py-1">Specialization</th>
                <th className="border px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companyCarts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">No carts found</td>
                </tr>
              ) : (
                companyCarts.map((cart) => (
                  <tr key={cart._id}>
                    <td className="border px-2 py-1">{cart.companyName}</td>
                    <td className="border px-2 py-1">{cart.experience}</td>
                    <td className="border px-2 py-1">{cart.location}</td>
                    <td className="border px-2 py-1">{cart.specialization}</td>
                    <td className="border px-2 py-1 flex gap-2">
                      <button className="bg-blue-500 px-2 py-1 text-white rounded" onClick={() => openModal(cart)}>View</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6">Engineer Dashboard</h1>

      <div className="flex gap-4 mb-4">
        {["projects", "companyCarts"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "companyCarts" ? "Company Carts" : "Projects"}
          </button>
        ))}
      </div>

      <div className="border rounded p-4 shadow overflow-x-auto">{renderTabContent()}</div>

      {/* Modal */}
      {modalOpen && modalContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 max-w-lg w-full relative">
            <button className="absolute top-2 right-2 text-red-500 font-bold" onClick={closeModal}>X</button>
            <pre className="whitespace-pre-wrap">{JSON.stringify(modalContent, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default EngDash;
