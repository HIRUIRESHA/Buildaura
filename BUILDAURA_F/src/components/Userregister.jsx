import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/users";
const COMPANY_API_URL = "http://localhost:5000/api/companies/all"; // fetch all companies

function UserRegister() {
  const navigate = useNavigate();

  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: "client",
    companyCustomId: "", // store MongoDB _id here
  });

  const [isLoading, setIsLoading] = useState(false);
  const [companies, setCompanies] = useState([]);

  // Fetch companies for dropdown
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch(COMPANY_API_URL);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        if (data.success && Array.isArray(data.companies)) {
          setCompanies(data.companies);
        } else {
          setCompanies([]);
          console.error("Expected array but got:", data);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
        setCompanies([]); // fallback to empty array
      }
    };
    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userForm.password !== userForm.confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: userForm.firstName,
          lastName: userForm.lastName,
          email: userForm.email,
          password: userForm.password,
          phoneNumber: userForm.phoneNumber,
          role: userForm.role === "site-engineer" ? "engineer" : "client",
          company:
            userForm.role === "site-engineer" ? userForm.companyCustomId : null,
        }),
      });

      const data = await res.json();
      console.log("Backend response:", data);

      if (res.ok) {
        alert(
          `✅ Registration successful! Welcome ${data.firstName}. Your User ID is ${data.userId}.`
        );
        navigate("/login");
      } else {
        alert(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("⚠️ Server error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-300 to-orange-500">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          User Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={userForm.firstName}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={userForm.lastName}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userForm.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={userForm.phoneNumber}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userForm.password}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={userForm.confirmPassword}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2"
          />

          <select
            name="role"
            value={userForm.role}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="client">Client</option>
            <option value="site-engineer">Engineer</option>
          </select>

          {/* Company Dropdown */}
          {userForm.role === "site-engineer" && (
            <select
              name="companyCustomId"
              value={userForm.companyCustomId}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">Select Company</option>
              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
            </select>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserRegister;
