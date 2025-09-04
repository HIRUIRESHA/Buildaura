import React, { useEffect, useState } from "react";
import { getCompanyProjects, updateProjectStatus } from "../services/projectCartServices";

function CompanyProject() {
  const companyData = JSON.parse(localStorage.getItem("company"));
  const companyId = companyData?.companyId;
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getCompanyProjects(companyId);
        if (res.success) {
          setProjects(res.projects);
        }
      } catch (err) {
        console.error("Error fetching company projects:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [companyId]);

  const handleStatusChange = async (projectId, status) => {
    try {
      const res = await updateProjectStatus(projectId, status);
      if (res.success) {
        setProjects((prev) =>
          prev.map((p) => (p._id === projectId ? { ...p, status } : p))
        );
      }
    } catch (err) {
      console.error("Error updating status:", err.message);
    }
  };

  if (loading) return <p>Loading projects...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Company Projects</h1>
      {projects.length === 0 ? (
        <p>No projects assigned yet.</p>
      ) : (
        <div className="space-y-4">
          {projects.map((p) => (
            <div
              key={p._id}
              className="border rounded-lg p-4 shadow-sm flex justify-between items-center"
            >
              <div>
                <h2 className="font-bold">{p.projectName}</h2>
                <p>Client: {p.client?.firstName} {p.client?.lastName}</p>
                <p>Status: {p.status || "Pending"}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusChange(p._id, "approved")}
                  className="bg-green-500 text-white px-3 py-1 rounded-lg"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusChange(p._id, "rejected")}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleStatusChange(p._id, "in progress")}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                >
                  In Progress
                </button>
                <button
                  onClick={() => handleStatusChange(p._id, "completed")}
                  className="bg-gray-500 text-white px-3 py-1 rounded-lg"
                >
                  Completed
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CompanyProject;
