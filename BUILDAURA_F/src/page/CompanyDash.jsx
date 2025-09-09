// src/pages/CompanyDash.jsx
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getCompanies } from "../services/companyServices";
import { getCompanyProjects, updateProjectStatus } from "../services/projectCartServices";

const CompanyDash = () => {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Fetch company profile
  const fetchProfile = async () => {
    try {
      const companyId = localStorage.getItem("companyMongoId");
      if (!companyId) throw new Error("Invalid Company ID");

      const data = await getCompanyProfile(companyId);
      setProfile(data.company || data);
    } catch (err) {
      console.error("Fetch profile error:", err);
      toast.error("Failed to fetch profile");
    }
  };

  // Fetch company projects
  const fetchProjects = async () => {
    try {
      const companyId = localStorage.getItem("companyMongoId");
      if (!companyId) throw new Error("Invalid Company ID");

      const data = await getCompanyProjects(companyId);
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

  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalContent(null);
    setModalOpen(false);
  };

  useEffect(() => {
    fetchProfile();
    fetchProjects();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-4">Company Dashboard</h1>

      {/* Company Profile */}
      {profile && (
        <div className="border p-4 rounded shadow mb-6">
          <h2 className="text-2xl font-semibold mb-2">Profile</h2>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Size:</strong> {profile.companySize || "-"}</p>
          <p><strong>Industry:</strong> {profile.industry || "-"}</p>
        </div>
      )}

      {/* Projects */}
      <div className="border p-4 rounded shadow overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border px-2 py-1">Project</th>
              <th className="border px-2 py-1">Client</th>
              <th className="border px-2 py-1">Budget</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">No projects found</td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project._id}>
                  <td className="border px-2 py-1">{project.projectName}</td>
                  <td className="border px-2 py-1">{project.client?.firstName} {project.client?.lastName}</td>
                  <td className="border px-2 py-1">{project.budget}</td>
                  <td className="border px-2 py-1">{project.status}</td>
                  <td className="border px-2 py-1 flex gap-2">
                    <button
                      className="bg-blue-500 px-2 py-1 text-white rounded"
                      onClick={() => openModal(project)}
                    >View</button>

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
      </div>

      {/* Modal */}
      {modalOpen && modalContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-red-500 font-bold"
              onClick={closeModal}
            >X</button>
            <pre className="whitespace-pre-wrap">{JSON.stringify(modalContent, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDash;
