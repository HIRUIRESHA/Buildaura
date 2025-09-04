import React, { useEffect, useState } from "react";
import { getCompanies, deleteCompany, editCompany } from "../services/companyServices";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminCompanyDashboard() {
  const [companies, setCompanies] = useState([]);
  const [editCompanyData, setEditCompanyData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await getCompanies();
      setCompanies(Array.isArray(response.companies) ? response.companies : []);
    } catch (error) {
      console.error("Error fetching companies:", error);
      toast.error("Failed to fetch companies");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this company?")) return;
    try {
      const result = await deleteCompany(id);
      toast.info(result.message);
      fetchCompanies();
    } catch (error) {
      console.error(error);
      toast.error("Error deleting company");
    }
  };

  const handleEdit = async () => {
    try {
      const result = await editCompany(editCompanyData._id, editCompanyData);
      toast.success(result.message || "Company updated");
      setEditCompanyData(null);
      fetchCompanies();
    } catch (error) {
      console.error(error);
      toast.error("Error editing company");
    }
  };

  const filteredCompanies = companies.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.companyId && c.companyId.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Company Management</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by company name or ID"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border px-3 py-2 rounded mb-4 w-full max-w-sm"
      />

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-4 py-2 text-left">Company ID</th>
            <th className="px-4 py-2 text-left">Company Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCompanies.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No companies found
              </td>
            </tr>
          ) : (
            filteredCompanies.map((company) => (
              <tr key={company._id} className="border-b">
                <td className="px-4 py-2">{company.companyId || "N/A"}</td>
                <td className="px-4 py-2">{company.name}</td>
                <td className="px-4 py-2">{company.email}</td>

                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => setEditCompanyData(company)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(company._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editCompanyData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold mb-4">Edit Company</h3>
            <input
              type="text"
              className="w-full mb-2 border px-3 py-2 rounded"
              value={editCompanyData.name}
              onChange={(e) =>
                setEditCompanyData({ ...editCompanyData, name: e.target.value })
              }
              placeholder="Company Name"
            />
            <input
              type="email"
              className="w-full mb-2 border px-3 py-2 rounded"
              value={editCompanyData.email}
              onChange={(e) =>
                setEditCompanyData({ ...editCompanyData, email: e.target.value })
              }
              placeholder="Email"
            />
            <input
              type="text"
              className="w-full mb-2 border px-3 py-2 rounded"
              value={editCompanyData.phoneNumber || ""}
              onChange={(e) =>
                setEditCompanyData({ ...editCompanyData, phoneNumber: e.target.value })
              }
              placeholder="Phone Number"
            />
            <input
              type="text"
              className="w-full mb-2 border px-3 py-2 rounded"
              value={editCompanyData.address || ""}
              onChange={(e) =>
                setEditCompanyData({ ...editCompanyData, address: e.target.value })
              }
              placeholder="Address"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setEditCompanyData(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
