import React, { useEffect, useState } from "react";
import { getUsers, deleteUser, editUser } from "../services/userServices";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [editUserData, setEditUserData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers(); // backend returns an array directly
      setUsers(Array.isArray(data) ? data : []); // <-- fix applied here
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const result = await deleteUser(id);
      toast.info(result.message || "User deleted!");
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Error deleting user");
    }
  };

  const handleEdit = async () => {
    try {
      const result = await editUser(editUserData._id, editUserData);
      toast.success(result.message || "User updated!");
      setEditUserData(null);
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Error editing user");
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.userId && user.userId.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      <input
        type="text"
        placeholder="Search by name, email, or User ID"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border px-3 py-2 rounded mb-4 w-full max-w-sm"
      />

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-4 py-2 text-left">User ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Role</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No users found
              </td>
            </tr>
          ) : (
            filteredUsers.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="px-4 py-2">{user.userId || "N/A"}</td>
                <td className="px-4 py-2">{user.firstName} {user.lastName}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 capitalize">{user.role}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button onClick={() => setEditUserData(user)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
                  <button onClick={() => handleDelete(user._id)} className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editUserData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold mb-4">Edit User</h3>
            <input
              type="text"
              className="w-full mb-2 border px-3 py-2 rounded"
              value={editUserData.firstName}
              onChange={(e) => setEditUserData({ ...editUserData, firstName: e.target.value })}
              placeholder="First Name"
            />
            <input
              type="text"
              className="w-full mb-2 border px-3 py-2 rounded"
              value={editUserData.lastName}
              onChange={(e) => setEditUserData({ ...editUserData, lastName: e.target.value })}
              placeholder="Last Name"
            />
            <input
              type="email"
              className="w-full mb-2 border px-3 py-2 rounded"
              value={editUserData.email}
              onChange={(e) => setEditUserData({ ...editUserData, email: e.target.value })}
              placeholder="Email"
            />
            <input
              type="text"
              className="w-full mb-2 border px-3 py-2 rounded"
              value={editUserData.phoneNumber || ""}
              onChange={(e) => setEditUserData({ ...editUserData, phoneNumber: e.target.value })}
              placeholder="Phone Number"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setEditUserData(null)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancel</button>
              <button onClick={handleEdit} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
