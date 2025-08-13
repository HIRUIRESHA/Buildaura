import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Phone,
  Briefcase,
  Building2,
  ArrowLeft,
} from "lucide-react";

export default function UserRegister() {
  const navigate = useNavigate();

  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: "",
    company: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    navigate("/signup"); // Adjust if needed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userForm.password !== userForm.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    await new Promise((r) => setTimeout(r, 2000));

    const userId =
      "BA" +
      Date.now().toString(36).toUpperCase() +
      Math.random().toString(36).substr(2, 4).toUpperCase();

    alert(`User registered successfully! Your User ID: ${userId}`);

    setIsLoading(false);
  };

  const isSubmitDisabled =
    isLoading || (userForm.role === "site-engineer" && !userForm.company);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-6 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
            type="button"
          >
            <ArrowLeft className="w-6 h-6" />
            Back
          </button>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            User Registration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="flex items-center gap-2 text-gray-700 text-sm font-medium"
                >
                  <User className="w-4 h-4" />
                  First Name
                </label>
                <input
                  id="firstName"
                  value={userForm.firstName}
                  onChange={(e) =>
                    setUserForm({ ...userForm, firstName: e.target.value })
                  }
                  placeholder="Enter first name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="flex items-center gap-2 text-gray-700 text-sm font-medium"
                >
                  <User className="w-4 h-4" />
                  Last Name
                </label>
                <input
                  id="lastName"
                  value={userForm.lastName}
                  onChange={(e) =>
                    setUserForm({ ...userForm, lastName: e.target.value })
                  }
                  placeholder="Enter last name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="userEmail"
                className="flex items-center gap-2 text-gray-700 text-sm font-medium"
              >
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <input
                id="userEmail"
                type="email"
                value={userForm.email}
                onChange={(e) =>
                  setUserForm({ ...userForm, email: e.target.value })
                }
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="userPassword"
                  className="flex items-center gap-2 text-gray-700 text-sm font-medium"
                >
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <input
                  id="userPassword"
                  type="password"
                  value={userForm.password}
                  onChange={(e) =>
                    setUserForm({ ...userForm, password: e.target.value })
                  }
                  placeholder="Enter password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="userConfirmPassword"
                  className="flex items-center gap-2 text-gray-700 text-sm font-medium"
                >
                  <Lock className="w-4 h-4" />
                  Confirm Password
                </label>
                <input
                  id="userConfirmPassword"
                  type="password"
                  value={userForm.confirmPassword}
                  onChange={(e) =>
                    setUserForm({ ...userForm, confirmPassword: e.target.value })
                  }
                  placeholder="Confirm password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="userPhone"
                className="flex items-center gap-2 text-gray-700 text-sm font-medium"
              >
                <Phone className="w-4 h-4" />
                Phone Number
              </label>
              <input
                id="userPhone"
                type="tel"
                value={userForm.phoneNumber}
                onChange={(e) =>
                  setUserForm({ ...userForm, phoneNumber: e.target.value })
                }
                placeholder="Enter phone number"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="role"
                className="flex items-center gap-2 text-gray-700 text-sm font-medium"
              >
                <Briefcase className="w-4 h-4" />
                Role
              </label>

              <select
                id="role"
                value={userForm.role}
                onChange={(e) =>
                  setUserForm({ ...userForm, role: e.target.value, company: "" })
                }
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="" disabled>
                  Select your role
                </option>
                <option value="client">Client</option>
                <option value="site-engineer">Site Engineer</option>
              </select>
            </div>

            {userForm.role === "site-engineer" && (
              <div className="space-y-2">
                <label
                  htmlFor="company"
                  className="flex items-center gap-2 text-gray-700 text-sm font-medium"
                >
                  <Building2 className="w-4 h-4" />
                  Company <span className="text-red-500">*</span>
                </label>
                <select
                  id="company"
                  value={userForm.company}
                  onChange={(e) =>
                    setUserForm({ ...userForm, company: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="" disabled>
                    Select your company
                  </option>
                  <option value="buildtech-solutions">BuildTech Solutions</option>
                  <option value="construction-masters">Construction Masters</option>
                  <option value="urban-builders">Urban Builders Inc.</option>
                  <option value="premier-construction">Premier Construction Co.</option>
                  <option value="skyline-builders">Skyline Builders</option>
                </select>
                <p className="text-xs text-gray-500">
                  Site engineers must be associated with a company
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitDisabled}
              className={`w-full py-4 rounded-lg font-medium text-lg shadow-lg transition-all duration-300 text-white ${
                isSubmitDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl"
              }`}
            >
              {isLoading ? "Creating User Account..." : "Register User"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
