import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getClientProjects } from "../services/projectCartServices";

export default function Project() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      // Check if we have a user with proper ID
      if (!user?._id && !user?.userId) {
        console.log("❌ No user ID available");
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        
        console.log("👤 Current user:", user);
        
        // Use userId if available, otherwise use _id
        const clientId = user.userId || user._id;
        console.log("🔍 Fetching projects for client ID:", clientId);
        
        const data = await getClientProjects(clientId);
        console.log("✅ API response data:", data);
        
        if (data.success) {
          setProjects(data.projects || []);
          console.log("📦 Projects set:", data.projects);
        } else {
          setError(data.message || "Failed to fetch projects");
        }
      } catch (err) {
        console.error("❌ Fetch error:", err);
        setError(err.message || "Server error. Please check console for details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user]);

  // Debug output
  console.log("🔄 Current projects state:", projects);
  console.log("⏳ Loading:", loading);
  console.log("❓ Error:", error);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Projects</h1>

      <button
        onClick={() => navigate("/projectcart")}
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded mb-6 transition"
      >
        New Project
      </button>

      {loading ? (
        <div className="p-4">
          <p>Loading projects...</p>
          <p className="text-sm text-gray-500 mt-2">
            User ID: {user?._id || user?.userId || "No ID found"}
          </p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 p-4 rounded">
          <p className="text-red-700 font-semibold">Error: {error}</p>
          <p className="text-sm text-gray-600 mt-2">
            User ID: {user?._id || user?.userId || "No ID found"}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-600 text-white px-3 py-1 rounded mt-2"
          >
            Retry
          </button>
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded">
          <p>No projects found for your account.</p>
          <p className="text-sm text-gray-600 mt-2">
            User ID: {user?._id || user?.userId}
          </p>
          <p className="text-sm text-gray-600">
            This could mean: no projects exist yet, or there's a ID mismatch.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project._id}
              className="border p-4 rounded shadow hover:shadow-lg transition"
            >
              <h2 className="font-bold text-xl">{project.projectName}</h2>
              
              <p className="mt-1">
                Status: <span className="font-semibold capitalize">{project.status}</span>
              </p>

              <p className="mt-1">
                Company:{" "}
                <span className="font-semibold">
                  {project.company?.name || "N/A"}
                </span>
              </p>

              <p className="mt-1">
                Budget: <span className="font-semibold">${project.budget}</span>
              </p>

              <p className="mt-1">
                Type: <span className="font-semibold capitalize">{project.projectType}</span>
              </p>

              <p className="mt-1">
                Start Date:{" "}
                <span className="font-semibold">
                  {new Date(project.startDate).toLocaleDateString()}
                </span>
              </p>

              <p className="mt-1 text-gray-700">{project.description}</p>

              <div className="mt-3">
                <button
                  onClick={() => navigate(`/projectdetails/${project._id}`)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}