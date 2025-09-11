// src/pages/CompanyDash.jsx
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getCompanies, getCompanyProfile } from "../services/companyServices";
import { getCompanyProjects, updateProjectStatus } from "../services/projectCartServices";

const CompanyDash = () => {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
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
        setProfile(data.projects[0].company); // get company info from first project
      }
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

  const getStatusBadge = (status) => {
    const statusStyles = {
      'pending_approval': 'bg-yellow-100 text-yellow-800 border-yellow-200',
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
      'pending_approval': 'Pending Approval',
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
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-300 bg-clip-text text-transparent mb-2">
            Company Dashboard
          </h1>
          <p className="text-gray-600">Manage your projects and track progress</p>
        </div>

        {/* Company Profile Card */}
        {profile && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-600 to-yellow-300 p-6">
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
                    <div className="text-3xl font-bold text-red-600">{projects.length}</div>
                    <div className="text-gray-600">Total Projects</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6">
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
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
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
                          <div className="flex gap-2">
                            <button
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                              onClick={() => openModal(project)}
                            >
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              View
                            </button>
                            <select
                              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

      {/* Enhanced Modal */}
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
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
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