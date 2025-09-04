import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const USER_API = "http://localhost:5000/api/users";
const ADMIN_API = "http://localhost:5000/api/admin";
const COMPANY_API = "http://localhost:5000/api/companies";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({ role: "user", identifier: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let API_ENDPOINT = "";
      let payload = {};

      if (form.role === "admin") {
        API_ENDPOINT = `${ADMIN_API}/login`;
        payload = { email: form.identifier, password: form.password };
      } else if (form.role === "user") {
        API_ENDPOINT = `${USER_API}/login`;
        payload = { userId: form.identifier, password: form.password };
      } else if (form.role === "company") {
        API_ENDPOINT = `${COMPANY_API}/login`;
        payload = { companyId: form.identifier, password: form.password };
      }

      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const contentType = res.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        throw new Error(`Server returned non-JSON response. Status: ${res.status}`);
      }

      if (res.ok) {
        let userRole = form.role;

        // Identify client vs engineer based on ID prefix
        if (form.role === "user") {
          const id = data.user?.userId || "";
          if (id.startsWith("ENG-")) userRole = "engineer";
          else if (id.startsWith("CLI-")) userRole = "client";
          else userRole = "client"; // fallback
        }

        // ✅ Store JWT token and userId in localStorage
        if (data.token) localStorage.setItem("token", data.token);

        // -----------------------------
        // ✅ Fix: Store _id in localStorage for ProjectCart/Project
        if (data.user?._id) {
          localStorage.setItem("userId", data.user._id);
        }
        // -----------------------------

        // Save login info in global context
        login({ ...data.user, role: userRole });

        // ✅ Store company details in localStorage if company login
        if (userRole === "company" && data.company) {
          localStorage.setItem(
            "company",
            JSON.stringify({
              companyId: data.company.companyId,
              name: data.company.name,
              ...data.company, // keep other info
            })
          );
        }

        // Redirect based on role
        if (userRole === "admin") navigate("/admin/users");
        else if (userRole === "company") navigate("/company/home");
        else if (userRole === "engineer") navigate("/eng/home");
        else if (userRole === "client") navigate("/client/home");
        else navigate("/");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error or invalid endpoint. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-300 to-orange-500">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="user">User</option>
            <option value="company">Company</option>
            <option value="admin">Admin</option>
          </select>

          <input
            type="text"
            name="identifier"
            placeholder={
              form.role === "admin"
                ? "Admin Email"
                : form.role === "user"
                ? "User ID (CLI-0001 / ENG-0001)"
                : "Company ID"
            }
            value={form.identifier}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
