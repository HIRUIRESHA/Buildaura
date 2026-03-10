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
  const [showPassword, setShowPassword] = useState(false);

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

        // Identify client vs engineer
        if (form.role === "user") {
          const id = data.user?.userId || "";
          if (id.startsWith("ENG-")) userRole = "engineer";
          else if (id.startsWith("CLI-")) userRole = "client";
          else userRole = "client"; 
        }

        if (data.token) localStorage.setItem("token", data.token);

        // Store MongoDB _id for project/cart fetches
        if (data.user?._id) {
          localStorage.setItem("userId", data.user._id);
        } else if (data.company?._id) {
          localStorage.setItem("userId", data.company._id);
        }
        // -----------------------------

        login({ ...data.user, role: userRole });

        // Store company info for company login
        if (userRole === "company" && data.company) {
          localStorage.setItem(
            "company",
            JSON.stringify({
              companyId: data.company.companyId,
              name: data.company.name,
              ...data.company,
            })
          );
        }

        // Redirect
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

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin": return "🛡️";
      case "user": return "👤";
      case "company": return "🏢";
      default: return "👤";
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "admin": return "from-orange-500 to-yellow-500";
      case "user": return "from-orange-500 to-yellow-500";
      case "company": return "from-orange-500 to-yellow-500";
      default: return "from-orange-500 to-yellow-500";
    }
  };

  const getPlaceholderText = () => {
    switch (form.role) {
      case "admin": return "Enter your admin email";
      case "user": return "Enter User ID (CLI-0001 / ENG-0001)";
      case "company": return "Enter your Company ID";
      default: return "Enter identifier";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-white to-orange-800 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 bg-black/10 backdrop-blur-xl border border-black/20 shadow-2xl rounded-3xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-black to-orange-500 rounded-full flex items-center justify-center text-3xl">
            🚀
          </div>
          <h1 className="text-3xl font-bold text-black mb-2">Welcome Back</h1>
          <p className="text-black-300">Sign in to continue to your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Select */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-black-300">Select Role</label>
            <div className="relative">
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
              >
                <option value="user" className="bg-gray-800 text-white">👤 User (Client/Engineer)</option>
                <option value="company" className="bg-gray-800 text-white">🏢 Company</option>
                <option value="admin" className="bg-gray-800 text-white">🛡️ Admin</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${getRoleColor(form.role)} text-white text-sm font-medium flex items-center gap-2`}>
              <span>{getRoleIcon(form.role)}</span>
              <span>Signing in as {form.role === "user" ? "User" : form.role.charAt(0).toUpperCase() + form.role.slice(1)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-black-300">
              {form.role === "admin" ? "Email Address" : form.role === "user" ? "User ID" : "Company ID"}
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {form.role === "admin" ? "📧" : form.role === "user" ? "🆔" : "🏢"}
              </div>
              <input
                type="text"
                name="identifier"
                placeholder={getPlaceholderText()}
                value={form.identifier}
                onChange={handleChange}
                required
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-black-300">Password</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔒
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl pl-12 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r ${getRoleColor(form.role)} text-white font-semibold py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-none flex items-center justify-center gap-2`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <span>→</span>
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-4 text-sm text-black-400">
            <span>🔐 Secure Login</span>
            <span>•</span>
            <span>⚡ Fast Access</span>
          </div>
        </div>
      </div>

      <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full opacity-50 animate-ping"></div>
      <div className="absolute top-20 right-20 w-1 h-1 bg-pink-300 rounded-full opacity-75 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-60 animate-bounce"></div>
      <div className="absolute bottom-10 right-10 w-1 h-1 bg-purple-300 rounded-full opacity-50 animate-ping animation-delay-1000"></div>
    </div>
  );
}