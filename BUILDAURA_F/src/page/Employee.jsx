// src/pages/Employee.jsx
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Employee = () => {
  const [employees, setEmployees] = useState([]);

  // Fetch company employees
  const fetchEmployees = async () => {
    try {
      const companyData = JSON.parse(localStorage.getItem("company"));
      const companyId = companyData?._id;

      if (!companyId) throw new Error("Company ID not found in localStorage");

      const res = await fetch(`http://localhost:5000/api/users/company/${companyId}`);
      const data = await res.json();

      if (data.success) {
        setEmployees(data.employees);
      } else {
        setEmployees([]);
        toast.error(data.message || "Failed to fetch employees");
      }
    } catch (err) {
      console.error("Error fetching employees:", err);
      toast.error("Error fetching employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Company Employees</h1>

      {employees.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No employees found for this company.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Phone</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-left">User ID</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">{emp.firstName} {emp.lastName}</td>
                  <td className="py-4 px-6">{emp.email}</td>
                  <td className="py-4 px-6">{emp.phoneNumber}</td>
                  <td className="py-4 px-6 capitalize">{emp.role}</td>
                  <td className="py-4 px-6">{emp.userId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Employee;
