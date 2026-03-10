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
  Eye,
  EyeOff,
  Shield,
  Zap,
  CheckCircle,
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-400 rounded-full animate-bounce opacity-70"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-red-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse opacity-80"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-orange-300 rounded-full animate-bounce animation-delay-1000 opacity-60"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Enhanced Back Button */}
          <div className="flex items-center mb-8">
            <button
              onClick={handleBack}
              type="button"
              className="group flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-black/20 text-black hover:bg-black/20 hover:border-white/40 px-4 py-2 rounded-xl transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="font-medium">Back to Options</span>
            </button>
          </div>

          {/* Main Card */}
          <div className="bg-white/10 backdrop-blur-2xl border border-black/20 rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8 lg:p-12">
              {/* Header Section */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    Company Registration
                  </h1>
                </div>
                <p className="text-xl text-black-300 max-w-2xl mx-auto">
                  Join BuildAura and revolutionize your construction project management
                </p>
              </div>

              {/* Benefits Bar */}
              <div className="flex items-center justify-center space-x-8 mb-12 text-black-300">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-sm">Secure Registration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm">Instant Setup</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                  <span className="text-sm">Verified Platform</span>
                </div>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Company Name */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-black-200 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-orange-400" />
                    Company Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="companyName"
                      value={companyForm.companyName}
                      onChange={handleChange}
                      placeholder="Enter your company name"
                      required
                      className="w-full bg-white backdrop-blur-sm border border-black/20 rounded-xl px-4 py-4 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-black-200 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-orange-400" />
                    Company Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={companyForm.email}
                      onChange={handleChange}
                      placeholder="company@example.com"
                      required
                      className="w-full bg-white backdrop-blur-sm border border-black/20 rounded-xl px-4 py-4 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-black-200 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-orange-400" />
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={companyForm.password}
                        onChange={handleChange}
                        placeholder="Create a secure password"
                        required
                        className="w-full bg-white backdrop-blur-sm border border-black/20 rounded-xl px-4 py-4 pr-12 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-black-200 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-orange-400" />
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={companyForm.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        required
                        className="w-full bg-white backdrop-blur-sm border border-black/20 rounded-xl px-4 py-4 pr-12 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Phone & Address */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-black-200 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-orange-400" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={companyForm.phoneNumber}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      required
                      className="w-full bg-white backdrop-blur-sm border border-black/20 rounded-xl px-4 py-4 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-black-200 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-orange-400" />
                      Company Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={companyForm.address}
                      onChange={handleChange}
                      placeholder="Enter company address"
                      required
                      className="w-full bg-white backdrop-blur-sm border border-black/20 rounded-xl px-4 py-4 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Company Size & Industry */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-black-200 flex items-center gap-2">
                      <Users className="w-4 h-4 text-orange-400" />
                      Company Size
                    </label>
                    <div className="relative">
                      <select
                        name="companySize"
                        value={companyForm.companySize}
                        onChange={handleChange}
                        required
                        className="w-full bg-white backdrop-blur-sm border border-black/20 rounded-xl px-4 py-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-gray-800 text-gray-400">
                          Select company size
                        </option>
                        <option value="1-10" className="bg-gray-800 text-white">1-10 employees</option>
                        <option value="11-50" className="bg-gray-800 text-white">11-50 employees</option>
                        <option value="51-200" className="bg-gray-800 text-white">51-200 employees</option>
                        <option value="200+" className="bg-gray-800 text-white">200+ employees</option>
                      </select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-black-200 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-orange-400" />
                      Industry Focus
                    </label>
                    <div className="relative">
                      <select
                        name="industry"
                        value={companyForm.industry}
                        onChange={handleChange}
                        required
                        className="w-full bg-white backdrop-blur-sm border border-black/20 rounded-xl px-4 py-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-gray-800 text-gray-400">
                          Select your industry
                        </option>
                        <option value="residential" className="bg-gray-800 text-white">Residential Construction</option>
                        <option value="commercial" className="bg-gray-800 text-white">Commercial Construction</option>
                        <option value="industrial" className="bg-gray-800 text-white">Industrial Construction</option>
                        <option value="infrastructure" className="bg-gray-800 text-white">Infrastructure</option>
                        <option value="renovation" className="bg-gray-800 text-white">Renovation & Remodeling</option>
                      </select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-xl flex items-center justify-center gap-3"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating Your Company Account...</span>
                      </>
                    ) : (
                      <>
                        <Building2 className="w-6 h-6" />
                        <span>Launch Your Company</span>
                        <span>🚀</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Security Notice */}
                <div className="text-center mt-6 text-black-400 text-sm">
                  <p>🔒 Your information is encrypted and secure</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}