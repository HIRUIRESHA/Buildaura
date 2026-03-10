import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getClientProjects } from "../services/projectCartServices";

export default function Project() {
  const { auth } = useContext(AuthContext);
  const user = auth.user;
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user?._id && !user?.userId) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const clientId = user.userId || user._id;
        console.log("Fetching projects for clientId:", clientId);

        const data = await getClientProjects(clientId);
        console.log("API response:", data);

        if (data.success && Array.isArray(data.projects)) {
          const projectsWithStringId = data.projects.map((p) => ({
            ...p,
            _id: p._id?.toString() || p.id?.toString(),
          }));
          setProjects(projectsWithStringId);
          setFilteredProjects(projectsWithStringId);
        } else {
          setProjects([]);
          setFilteredProjects([]);
          setError(data.message || "No projects found");
        }
      } catch (err) {
        console.error("Fetch projects error:", err);
        setError(err.message || "Server error while fetching projects");
        setProjects([]);
        setFilteredProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user]);

  // Search functionality
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProjects(projects);
      return;
    }

    const filtered = projects.filter((project) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        project.projectName?.toLowerCase().includes(searchLower) ||
        project.company?.name?.toLowerCase().includes(searchLower) ||
        project.description?.toLowerCase().includes(searchLower) ||
        project.projectType?.toLowerCase().includes(searchLower) ||
        getStatusText(project.status).toLowerCase().includes(searchLower)
      );
    });

    setFilteredProjects(filtered);
  }, [searchTerm, projects]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      'pending_approval': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'approved': 'bg-green-100 text-green-800 border-green-200',
      'rejected': 'bg-red-100 text-red-800 border-red-200',
      'in_progress': 'bg-blue-100 text-blue-800 border-blue-200',
      'hold': 'bg-orange-100 text-orange-800 border-orange-200',
      'completed': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'pending_start': 'bg-purple-100 text-purple-800 border-purple-200',
      'pending': 'bg-gray-100 text-gray-800 border-gray-200'
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
      'pending_start': 'Pending Start',
      'pending': 'Pending'
    };
    
    return statusTexts[status] || status;
  };

  const getProjectTypeIcon = (type) => {
    const icons = {
      'residential': '🏠',
      'commercial': '🏢',
      'industrial': '🏭',
      'infrastructure': '🛤️',
      'renovation': '🔨'
    };
    
    return icons[type] || '📋';
  };

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-16">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      <div className="ml-4">
        <p className="text-lg font-semibold text-gray-700">Loading projects...</p>
        <p className="text-sm text-gray-500">
          User ID: {user?._id || user?.userId || "No ID found"}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            My Projects
          </h1>
          <p className="text-gray-600">Track and manage your project portfolio</p>
        </div>

       

        <div className="mb-8 flex justify-center">
          <button
            onClick={() => navigate("/projectcart")}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Project
          </button>
        </div>

         {/* Search Bar */}
        {!loading && !error && projects.length > 0 && (
          <div className="mb-8 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search projects..."
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm text-gray-900 placeholder-gray-500"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg className="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Search Results Info */}
        {!loading && !error && projects.length > 0 && searchTerm && (
          <div className="mb-6 text-center">
            <p className="text-gray-600">
              Found {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} 
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
            {filteredProjects.length === 0 && (
              <button
                onClick={clearSearch}
                className="mt-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear search to view all projects
              </button>
            )}
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl shadow-lg border border-red-200 overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <svg className="w-7 h-7 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Error Loading Projects
              </h2>
            </div>
            <div className="p-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <p className="text-red-700 font-semibold text-lg mb-2">Error: {error}</p>
                <p className="text-gray-600 mb-2">
                  User ID: {user?._id || user?.userId || "No ID found"}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Retry Loading
                </button>
              </div>
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <svg className="w-7 h-7 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1h-6a1 1 0 01-1-1V8z" clipRule="evenodd" />
                </svg>
                No Projects Found
              </h2>
            </div>
            <div className="p-12 text-center">
              <svg className="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Projects Yet</h3>
              <p className="text-gray-600 mb-4">You haven't created any projects yet. Get started by creating your first project!</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600">
                  User ID: {user?._id || user?.userId}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  This could mean: no projects exist yet, or there's an ID mismatch.
                </p>
              </div>
              <button
                onClick={() => navigate("/projectcart")}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
              >
                Create Your First Project
              </button>
            </div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-12 text-center">
              <svg className="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Matching Projects</h3>
              <p className="text-gray-600 mb-4">
                No projects found matching "{searchTerm}". Try adjusting your search terms.
              </p>
              <button
                onClick={clearSearch}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
              >
                Clear Search
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => {
              const projectId = project._id || project.id;
              return (
                <div
                  key={projectId}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6">
                    <div className="flex items-center justify-between">
                      <h2 className="font-bold text-xl text-white truncate mr-4">
                        {project.projectName}
                      </h2>
                      <span className="text-3xl">
                        {getProjectTypeIcon(project.projectType)}
                      </span>
                    </div>
                    <div className="mt-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadge(project.status)}`}>
                        {getStatusText(project.status)}
                      </span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {/* Company */}
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Company</p>
                          <p className="font-semibold text-gray-900">{project.company?.name || "N/A"}</p>
                        </div>
                      </div>

                      {/* Budget */}
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Budget</p>
                          <p className="font-bold text-green-600 text-lg">${project.budget?.toLocaleString()}</p>
                        </div>
                      </div>

                      {/* Start Date */}
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Start Date</p>
                          <p className="font-semibold text-gray-900">
                            {project.startDate
                              ? new Date(project.startDate).toLocaleDateString()
                              : "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {project.description || "No description provided"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <button
                      onClick={() => navigate(`/projectdetails/${projectId}`)}
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Projects Summary */}
        {filteredProjects.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchTerm ? 'Search Results Summary' : 'Project Summary'}
              </h3>
              <div className="flex justify-center space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{filteredProjects.length}</div>
                  <div className="text-sm text-gray-500">
                    {searchTerm ? 'Matching Projects' : 'Total Projects'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {filteredProjects.filter(p => p.status === 'completed').length}
                  </div>
                  <div className="text-sm text-gray-500">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">
                    {filteredProjects.filter(p => p.status === 'in_progress').length}
                  </div>
                  <div className="text-sm text-gray-500">In Progress</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}