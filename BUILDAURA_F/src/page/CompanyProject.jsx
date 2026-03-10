import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getCompanyProjects, updateProjectStatus } from "../services/projectCartServices";

export default function CompanyProject() {
  const { user } = useContext(AuthContext); 
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [updatingStatus, setUpdatingStatus] = useState({});

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user?._id && !user?.companyId) return;

      setLoading(true);
      try {
        const companyId = user._id || user.companyId;
        const data = await getCompanyProjects(companyId);
        
        if (data.success) {
          setProjects(data.projects || []);
          setError("");
        } else {
          setError(data.message || "Failed to fetch projects");
        }
      } catch (err) {
        console.error("Fetch projects error:", err);
        setError(err.message || "Error fetching projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user]);

  const handleStatusChange = async (projectId, newStatus) => {
    try {
      setUpdatingStatus(prev => ({ ...prev, [projectId]: true }));
      
      const data = await updateProjectStatus(projectId, newStatus, `Status changed to ${newStatus} by company`);
      
      if (data.success) {
        setProjects((prev) =>
          prev.map((p) => (p._id === projectId ? data.project : p))
        );
      } else {
        alert(data.message || "⚠️ Failed to update project status.");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert(err.message || "⚠️ Failed to update project status.");
    } finally {
      setUpdatingStatus(prev => ({ ...prev, [projectId]: false }));
    }
  };

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
      case "pending_approval":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-blue-100 text-blue-800";
      case "in_progress":
        return "bg-purple-100 text-purple-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "rejected":
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "hold":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderActions = (project) => {
    if (updatingStatus[project._id]) {
      return (
        <div className="flex items-center text-gray-500">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
          Updating...
        </div>
      );
    }

    switch (project.status) {
      case "pending":
      case "pending_approval":
        return (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleStatusChange(project._id, "approved")}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
            >
              Approve
            </button>
            <button
              onClick={() => handleStatusChange(project._id, "rejected")}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            >
              Reject
            </button>
            <button
              onClick={() => handleStatusChange(project._id, "hold")}
              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm"
            >
              Put on Hold
            </button>
          </div>
        );
      case "approved":
        return (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleStatusChange(project._id, "in_progress")}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
            >
              Start Work
            </button>
            <button
              onClick={() => handleStatusChange(project._id, "hold")}
              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm"
            >
              Put on Hold
            </button>
          </div>
        );
      case "in_progress":
        return (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleStatusChange(project._id, "completed")}
              className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 text-sm"
            >
              Mark Complete
            </button>
            <button
              onClick={() => handleStatusChange(project._id, "hold")}
              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm"
            >
              Put on Hold
            </button>
          </div>
        );
      case "hold":
        return (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleStatusChange(project._id, "in_progress")}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
            >
              Resume Work
            </button>
            <button
              onClick={() => handleStatusChange(project._id, "completed")}
              className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 text-sm"
            >
              Mark Complete
            </button>
          </div>
        );
      default:
        return (
          <span className="text-gray-500 text-sm">No actions available</span>
        );
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Company Projects</h1>
        
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="pending_approval">Pending Approval</option>
          <option value="approved">Approved</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="hold">On Hold</option>
          <option value="rejected">Rejected</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
          >
            Try Again
          </button>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">
            {filter === "all" 
              ? "No projects assigned to your company." 
              : `No projects with status "${filter}".`
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project._id}
              className="border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="font-bold text-xl text-gray-800">
                  {project.projectName}
                </h2>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status.replace("_", " ")}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Client</p>
                  <p className="font-semibold">
                    {project.client?.firstName} {project.client?.lastName}
                  </p>
                  <p className="text-sm text-gray-500">{project.client?.email}</p>
                  {project.client?.userId && (
                    <p className="text-xs text-gray-400">ID: {project.client.userId}</p>
                  )}
                </div>

                <div>
                  <p className="text-sm text-gray-600">Budget</p>
                  <p className="font-semibold">${project.budget?.toLocaleString()}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="font-semibold capitalize">{project.projectType}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Start Date</p>
                  <p className="font-semibold">
                    {new Date(project.startDate).toLocaleDateString()}
                  </p>
                </div>

                {project.estimatedEndDate && (
                  <div>
                    <p className="text-sm text-gray-600">Estimated End</p>
                    <p className="font-semibold">
                      {new Date(project.estimatedEndDate).toLocaleDateString()}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-600">Description</p>
                  <p className="text-gray-700">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                {renderActions(project)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}