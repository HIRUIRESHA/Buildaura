import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getClientProjects } from "../services/projectCartServices";

export default function Project() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (user?._id) {
      getClientProjects(user._id).then(data => {
        if (data.success) setProjects(data.projects);
      });
    }
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Projects</h1>
      <button
        onClick={() => navigate("/projectcart")}
        className="bg-orange-500 text-white px-4 py-2 rounded mb-4"
      >
        \New Project
      </button>

      <div className="space-y-4">
        {projects.map(p => (
          <div key={p._id} className="border p-4 rounded shadow">
            <h2 className="font-bold">{p.projectName}</h2>
            <p>Status: {p.status}</p>
            <button
              onClick={() => navigate(`/projectdetails/${p._id}`)}
              className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
