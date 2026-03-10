import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Employee = () => {
  const [employees, setEmployees] = useState([]);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Company Employees
              </h1>
              <p className="text-gray-600 text-lg">
                Manage and view your team members
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="bg-white rounded-full px-4 py-2 shadow-sm border">
                <span className="text-sm font-medium text-gray-600">Total: </span>
                <span className="text-lg font-bold text-blue-600">{employees.length}</span>
              </div>
            </div>
          </div>
        </div>

        {employees.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Employees Found</h3>
              <p className="text-gray-500 text-lg">
                Your team roster is empty. Start by adding some employees to see them here.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="md:hidden">
              <div className="p-4 space-y-4">
                {employees.map((emp, index) => (
                  <div 
                    key={emp._id} 
                    className="bg-gradient-to-r from-white to-gray-50 p-5 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {emp.firstName?.[0]}{emp.lastName?.[0]}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 text-lg">
                            {emp.firstName} {emp.lastName}
                          </h3>
                          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full capitalize">
                            {emp.role}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-600">{emp.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-gray-600">{emp.phoneNumber}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                        </svg>
                        <span className="text-gray-600 font-mono text-xs">{emp.userId}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <tr>
                    <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">
                      Role
                    </th>
                    <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">
                      User ID
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {employees.map((emp, index) => (
                    <tr 
                      key={emp._id} 
                      className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="py-5 px-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-semibold text-sm">
                              {emp.firstName?.[0]}{emp.lastName?.[0]}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-lg">
                              {emp.firstName} {emp.lastName}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <div className="space-y-1">
                          <p className="text-gray-900 font-medium">{emp.email}</p>
                          <p className="text-gray-500 text-sm">{emp.phoneNumber}</p>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 capitalize">
                          {emp.role}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <span className="font-mono text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {emp.userId}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Employee;