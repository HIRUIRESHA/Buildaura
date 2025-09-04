import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Mail,
  Lock,
  Phone,
  MapPin,
  Users,
  Briefcase,
  ArrowLeft,
} from "lucide-react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/companies";

export default function CompanySign() {
  const navigate = useNavigate();

  const [companyForm, setCompanyForm] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
    companySize: "",
    industry: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setCompanyForm({ ...companyForm, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (companyForm.password !== companyForm.confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    if (!companyForm.companySize || !companyForm.industry) {
      alert("❌ Please select Company Size and Industry!");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        name: companyForm.companyName,
        email: companyForm.email,
        password: companyForm.password,
        phoneNumber: companyForm.phoneNumber,
        address: companyForm.address,
        companySize: companyForm.companySize,
        industry: companyForm.industry,
      };

      const res = await axios.post(`${API_URL}/register`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      const data = res.data;

      // ✅ Check backend response
      if (res.status === 201 || data.company) {
        alert(
          `✅ Company registered successfully!\nWelcome ${data.company?.name || companyForm.companyName}!\nYour Company ID: ${data.company?.companyId}`
        );
        navigate("/login");
      } else {
        alert(`❌ ${data.message || "Failed to register company"}`);
      }
    } catch (error) {
      console.error("Company registration error:", error);

      if (error.response) {
        // Show exact backend error
        alert(`⚠️ ${error.response.data.error || error.response.data.message}`);
      } else {
        alert("⚠️ Server error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => navigate("/signup");

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-orange-300 to-orange-400 p-4 flex items-center justify-center">
      <div className="w-full max-w-6xl">
        {/* Back Button */}
        <div className="flex items-center mb-8">
          <button
            onClick={handleBack}
            type="button"
            className="flex items-center gap-2 text-orange-600 hover:text-orange-800 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="font-semibold">Back</span>
          </button>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 lg:p-12">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-8 h-8 text-orange-500" />
                <h2 className="text-3xl font-bold text-gray-800">
                  Company Registration
                </h2>
              </div>
              <p className="text-gray-600">
                Register your construction company to start managing projects
              </p>
            </div>

            {/* Company Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={companyForm.companyName}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Company Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={companyForm.email}
                  onChange={handleChange}
                  placeholder="company@example.com"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Password & Confirm */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Lock className="w-4 h-4" /> Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={companyForm.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Lock className="w-4 h-4" /> Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={companyForm.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={companyForm.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={companyForm.address}
                  onChange={handleChange}
                  placeholder="Enter company address"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Company Size & Industry */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Users className="w-4 h-4" /> Company Size
                  </label>
                  <select
                    name="companySize"
                    value={companyForm.companySize}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="" disabled>
                      Select size
                    </option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="200+">200+ employees</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> Industry
                  </label>
                  <select
                    name="industry"
                    value={companyForm.industry}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="" disabled>
                      Select industry
                    </option>
                    <option value="residential">Residential Construction</option>
                    <option value="commercial">Commercial Construction</option>
                    <option value="industrial">Industrial Construction</option>
                    <option value="infrastructure">Infrastructure</option>
                    <option value="renovation">Renovation & Remodeling</option>
                  </select>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isLoading ? "Creating Company Account..." : "Register Company"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
