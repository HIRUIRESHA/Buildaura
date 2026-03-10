// src/pages/CompanyDash.jsx
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getCompanies, getCompanyProfile } from "../services/companyServices";
import { getCompanyProjects, updateProjectStatus, assignEngineerToProject } from "../services/projectCartServices"; 
import { getCompanyEngineers } from "../services/userServices"; 

const CompanyDash = () => {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [engineers, setEngineers] = useState([]); 
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Fetch company profile
  const fetchProfile = async () => {
    try {
      const companyData = JSON.parse(localStorage.getItem("company"));
      const companyId = companyData?._id;

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
      const companyData = JSON.parse(localStorage.getItem("company"));
      const companyId = companyData?._id;

      if (!companyId) throw new Error("Invalid Company ID");

      const data = await getCompanyProjects(companyId);
      setProjects(data.projects || []);
      if (data.projects?.length) {
        setProfile(data.projects[0].company); 
      }
    } catch (err) {
      console.error("Fetch projects error:", err);
      toast.error("Failed to fetch projects");
    }
  };

  //  Fetch engineers
  const fetchEngineers = async () => {
    try {
      const companyData = JSON.parse(localStorage.getItem("company"));
      const companyId = companyData?._id;

      if (!companyId) throw new Error("Invalid Company ID");

      const res = await getCompanyEngineers(companyId);
      setEngineers(res.employees || []);
    } catch (err) {
      console.error("Fetch engineers error:", err);
      toast.error("Failed to fetch engineers");
    }
  };

  const handleUpdateStatus = async (projectId, status) => {
    try {
      await updateProjectStatus(projectId, status);
      toast.success(`Project ${status}`);
      fetchProjects();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  //  Assign Engineer
  const handleAssignEngineer = async (projectId, engineerId) => {
    try {
      await assignEngineerToProject(projectId, engineerId);
      toast.success("Engineer assigned successfully");
      fetchProjects();
    } catch (err) {
      console.error(err);
      toast.error("Failed to assign engineer");
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

  const getStatusBadge = (status) => {
    const statusStyles = {
      'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'approved': 'bg-green-100 text-green-800 border-green-200',
      'rejected': 'bg-red-100 text-red-800 border-red-200',
      'in_progress': 'bg-blue-100 text-blue-800 border-blue-200',
      'hold': 'bg-orange-100 text-orange-800 border-orange-200',
      'completed': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'pending_start': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return statusStyles[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusText = (status) => {
    const statusTexts = {
      'pending': 'Pending',
      'approved': 'Approved',
      'rejected': 'Rejected',
      'in_progress': 'In Progress',
      'hold': 'On Hold',
      'completed': 'Completed',
      'pending_start': 'Pending Start'
    };
    return statusTexts[status] || status;
  };

  useEffect(() => {
    fetchProfile();
    fetchProjects();
    fetchEngineers(); 
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <div className="p-6 max-w-7xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
            Company Dashboard
          </h1>
          <p className="text-gray-600">Manage your projects and track progress</p>
        </div>

        {profile && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-950 to-slate-900 p-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
                Company Profile
              </h2>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Company Name</p>
                      <p className="text-lg font-semibold text-gray-900">{profile.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="text-lg font-semibold text-gray-900">{profile.email}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-sky-600">{projects.length}</div>
                    <div className="text-gray-600">Total Projects</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {engineers.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <svg className="w-7 h-7 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                  </svg>
                  Engineering Team
                </h2>
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-white font-semibold text-sm">
                    {engineers.length} Engineer{engineers.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
              <p className="text-indigo-100 mt-2">Professional engineering team members</p>
            </div>

            <div className="p-6">
              <div className="hidden lg:block">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-100">
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">ID</th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">Engineer</th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">Contact</th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">Phone</th>
                      </tr>
                    </thead>
                    <tbody>
                      {engineers.map((eng, index) => (
                        <tr 
                          key={eng.userId} 
                          className={`border-b border-gray-50 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200 ${
                            index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                          }`}
                        >
                          <td className="py-4 px-4">
                            <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                              #{eng.userId}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                                <span className="text-white font-bold text-sm">
                                  {eng.firstName?.charAt(0)}{eng.lastName?.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">
                                  {eng.firstName} {eng.lastName}
                                </div>
                                <div className="text-sm text-gray-500">Engineer</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center text-gray-700">
                              <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              <span className="hover:text-indigo-600 transition-colors cursor-pointer">
                                {eng.email}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center text-gray-700">
                              <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              <span className="hover:text-indigo-600 transition-colors cursor-pointer">
                                {eng.phoneNumber}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="lg:hidden space-y-4">
                {engineers.map((eng) => (
                  <div 
                    key={eng.userId} 
                    className="bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold text-lg">
                          {eng.firstName?.charAt(0)}{eng.lastName?.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg">
                          {eng.firstName} {eng.lastName}
                        </h3>
                        <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium inline-block mt-1">
                          ID: #{eng.userId}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="text-gray-900 font-medium">{eng.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="text-gray-900 font-medium">{eng.phoneNumber}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  Total Engineers: <span className="font-semibold text-gray-900">{engineers.length}</span>
                </span>
                <span className="text-gray-500 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Last updated: {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-600 to-yellow-500 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Project Management
            </h2>
          </div>
          <div className="p-6">
            {projects.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Projects Found</h3>
                <p className="text-gray-500">You don't have any projects yet. Create your first project to get started.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-100">
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Project</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Client</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Budget</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project, index) => (
                      <tr key={project._id} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                        <td className="py-4 px-4">
                          <div className="font-medium text-gray-900">{project.projectName}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-xs font-medium text-blue-600">
                                {project.client?.firstName?.charAt(0)}{project.client?.lastName?.charAt(0)}
                              </span>
                            </div>
                            <span className="text-gray-900">
                              {project.client?.firstName} {project.client?.lastName}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-lg font-semibold text-green-600">
                            ${project.budget?.toLocaleString()}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(project.status)}`}>
                            {getStatusText(project.status)}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-col gap-2">
                            <td className="py-4 px-4">
                              <div className="flex gap-2">
                                {/* View Button */}
                                <button
                                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                                  onClick={() => openModal(project)}
                                >
                                  View
                                </button>

                                {/* Approve / Reject Buttons */}
                                {project.status === "pending" && (
                                  <>
                                    <button
                                      onClick={() => handleUpdateStatus(project._id, "approved")}
                                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium"
                                    >
                                      Approve
                                    </button>
                                    <button
                                      onClick={() => handleUpdateStatus(project._id, "rejected")}
                                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium"
                                    >
                                      Reject
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>


                            {/*  Engineer Assignment Dropdown */}
                            {project.status === "approved" && (
                              <select
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                defaultValue=""
                                onChange={(e) => handleAssignEngineer(project._id, e.target.value)}
                              >
                                <option value="" disabled>Select Engineer</option>
                                {engineers.map((eng) => (
                                  <option key={eng.userId} value={eng.userId}>
                                    {eng.firstName} {eng.lastName}
                                  </option>
                                ))}
                              </select>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

    
      {modalOpen && modalContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Project Details</h3>
                <button
                  className="text-white hover:text-gray-200 transition-colors p-1"
                  onClick={closeModal}
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono overflow-x-auto">
                  {JSON.stringify(modalContent, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDash;